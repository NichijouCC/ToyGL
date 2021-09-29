import { DefaultMaterial } from "..";
import { PrimitiveTypeEnum, VertexAttEnum } from "../..";
import { loadArrayBuffer } from "../../io";
import { Asset, Geometry, StaticGeometry } from "../../scene";
import { IAssetLoader } from "../resource";

interface IHeader {
    format: string,
    version: string,
    comments: any[],
    elements: IElement[],
    headerLength: number,
}

interface IElement {
    type: string,
    name: string,
    count: number,
    countType: string,
    itemType: string,
    properties: IProperty[]
}

interface IProperty {
    name: string,
    type: string,
    countType: string,
    itemType: string,
}

interface IData {
    indices: number[],
    vertices: number[],
    normals: number[],
    uvs: number[],
    colors: number[]
}

export class LoadPLY implements IAssetLoader {
    load(url: string): Promise<Geometry> {
        return loadArrayBuffer(url)
            .then(res => {
                return this.parse(res);
            })
    }
    parse(data: ArrayBuffer, propertyNameMapping: any = {}) {
        function isASCII(data: ArrayBuffer) {
            var header = parseHeader(bin2strHeader(data));
            return header.format === 'ascii';
        }

        function bin2str(buf: ArrayBuffer) {
            var array_buffer = new Uint8Array(buf);
            var str = '';
            for (var i = 0; i < buf.byteLength; i++) {
                str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
            }
            return str;
        }

        function bin2strHeader(buf: ArrayBuffer) { // decode only the file header
            var array_buffer = new Uint8Array(buf);
            var patternHeader = /ply([\s\S]*)end_header\s/;
            var str = '';
            var i = 0;
            while (!patternHeader.exec(str)) {
                str += String.fromCharCode(array_buffer[i]); // implicitly assumes little-endian
                i++;
            }
            return str;
        }

        function parseHeader(data: string): IHeader {
            var patternHeader = /ply([\s\S]*)end_header\s/;
            var headerText = '';
            var headerLength = 0;
            var result = patternHeader.exec(data);
            if (result !== null) {
                headerText = result[1];
                headerLength = result[0].length;
            }
            var header: IHeader = {
                comments: [],
                elements: [],
                headerLength: headerLength
            } as any;

            var lines = headerText.split('\n');
            var currentElement: IElement;
            var lineType, lineValues;

            function make_ply_element_property(propertValues: any[], propertyNameMapping: any) {
                var property: IElement = { type: propertValues[0] } as any;
                if (property.type === 'list') {
                    property.name = propertValues[3];
                    property.countType = propertValues[1];
                    property.itemType = propertValues[2];

                } else {
                    property.name = propertValues[1];
                }
                if (property.name in propertyNameMapping) {
                    property.name = propertyNameMapping[property.name];
                }
                return property;
            }

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line = line.trim();
                if (line === '') continue;
                lineValues = line.split(/\s+/);
                lineType = lineValues.shift();
                line = lineValues.join(' ');
                switch (lineType) {
                    case 'format':
                        header.format = lineValues[0];
                        header.version = lineValues[1];
                        break;
                    case 'comment':
                        header.comments.push(line);
                        break;
                    case 'element':
                        if (currentElement !== undefined) {
                            header.elements.push(currentElement);
                        }
                        currentElement = {} as any;
                        currentElement.name = lineValues[0];
                        currentElement.count = parseInt(lineValues[1]);
                        currentElement.properties = [];
                        break;

                    case 'property':
                        currentElement.properties.push(make_ply_element_property(lineValues, propertyNameMapping));
                        break;
                    default:
                        console.log('unhandled', lineType, lineValues);

                }
            }

            if (currentElement !== undefined) {
                header.elements.push(currentElement);
            }
            return header;
        }

        function parseASCIINumber(n: string, type: string) {
            switch (type) {
                case 'char': case 'uchar': case 'short': case 'ushort': case 'int': case 'uint':
                case 'int8': case 'uint8': case 'int16': case 'uint16': case 'int32': case 'uint32':
                    return parseInt(n);
                case 'float': case 'double': case 'float32': case 'float64':
                    return parseFloat(n);
            }
        }
        function parseASCIIElement(properties: IProperty[], line: string) {
            var values = line.split(/\s+/);
            var element: { [name: string]: number[] | number } = {};
            for (var i = 0; i < properties.length; i++) {
                if (properties[i].type === 'list') {
                    var list = [];
                    var n = parseASCIINumber(values.shift(), properties[i].countType);
                    for (var j = 0; j < n; j++) {
                        list.push(parseASCIINumber(values.shift(), properties[i].itemType));
                    }
                    element[properties[i].name] = list;
                } else {
                    element[properties[i].name] = parseASCIINumber(values.shift(), properties[i].type);
                }
            }
            return element;
        }

        function parseASCII(data: string) {
            // PLY ascii format specification, as per http://en.wikipedia.org/wiki/PLY_(file_format)
            var buffer: IData = { indices: [], vertices: [], normals: [], uvs: [], colors: [] };

            var result;
            var header = parseHeader(data);
            var patternBody = /end_header\s([\s\S]*)$/;
            var body = '';
            if ((result = patternBody.exec(data)) !== null) {
                body = result[1];
            }

            var lines = body.split('\n');
            var currentElement = 0;
            var currentElementCount = 0;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line = line.trim();
                if (line === '') {
                    continue;
                }
                if (currentElementCount >= header.elements[currentElement].count) {
                    currentElement++;
                    currentElementCount = 0;
                }
                var element = parseASCIIElement(header.elements[currentElement].properties, line);
                handleElement(buffer, header.elements[currentElement].name, element);
                currentElementCount++;
            }

            return postProcess(buffer);
        }

        function postProcess(buffer: { indices: number[], vertices: number[], normals: number[], uvs: number[], colors: number[] }) {
            let geometry = new Geometry({
                attributes: [{
                    type: VertexAttEnum.POSITION,
                    data: buffer.vertices,
                    componentSize: 3,
                }],
                primitiveType: PrimitiveTypeEnum.POINTS,
            });
            // mandatory buffer data
            if (buffer.indices.length > 0) {
                geometry.setIndices(buffer.indices)
            }
            // optional buffer data
            if (buffer.normals.length > 0) {
                geometry.addAttribute(VertexAttEnum.NORMAL, { data: buffer.normals, componentSize: 3 })
            }
            if (buffer.uvs.length > 0) {
                geometry.addAttribute(VertexAttEnum.TEXCOORD_0, { data: buffer.uvs, componentSize: 2 })
            }
            if (buffer.colors.length > 0) {
                geometry.addAttribute(VertexAttEnum.COLOR_0, { data: buffer.colors, componentSize: 3 })
            }
            return geometry;
        }

        function handleElement(buffer: IData, elementName: string, props: { [name: string]: any }) {
            if (elementName === 'vertex') {
                if ('x' in props && 'y' in props && 'z' in props) {
                    buffer.vertices.push(props.x, props.y, props.z);
                }
                if ('nx' in props && 'ny' in props && 'nz' in props) {
                    buffer.normals.push(props.nx, props.ny, props.nz);
                }
                if ('s' in props && 't' in props) {
                    buffer.uvs.push(props.s, props.t);
                }
                if ('red' in props && 'green' in props && 'blue' in props) {
                    buffer.colors.push(props.red / 255.0, props.green / 255.0, props.blue / 255.0);
                }
            } else if (elementName === 'face') {
                var vertex_indices = props.vertex_indices || props.vertex_index; // issue #9338
                if (vertex_indices.length === 3) {
                    buffer.indices.push(vertex_indices[0], vertex_indices[1], vertex_indices[2]);
                } else if (vertex_indices.length === 4) {
                    buffer.indices.push(vertex_indices[0], vertex_indices[1], vertex_indices[3]);
                    buffer.indices.push(vertex_indices[1], vertex_indices[2], vertex_indices[3]);
                }
            }
        }

        function binaryRead(dataview: DataView, at: number, type: string, little_endian: boolean): [number, number] {
            switch (type) {
                // corespondences for non-specific length types here match rply:
                case 'int8': case 'char': return [dataview.getInt8(at), 1];
                case 'uint8': case 'uchar': return [dataview.getUint8(at), 1];
                case 'int16': case 'short': return [dataview.getInt16(at, little_endian), 2];
                case 'uint16': case 'ushort': return [dataview.getUint16(at, little_endian), 2];
                case 'int32': case 'int': return [dataview.getInt32(at, little_endian), 4];
                case 'uint32': case 'uint': return [dataview.getUint32(at, little_endian), 4];
                case 'float32': case 'float': return [dataview.getFloat32(at, little_endian), 4];
                case 'float64': case 'double': return [dataview.getFloat64(at, little_endian), 8];
            }

        }

        function binaryReadElement(dataview: DataView, at: number, properties: IProperty[], little_endian: boolean) {
            var props: { [name: string]: number[] | number } = {};
            var result: number[], read = 0;
            for (var i = 0; i < properties.length; i++) {
                if (properties[i].type === 'list') {
                    var list: number[] = [];
                    result = binaryRead(dataview, at + read, properties[i].countType, little_endian);
                    var n = result[0];
                    read += result[1];
                    for (var j = 0; j < n; j++) {
                        result = binaryRead(dataview, at + read, properties[i].itemType, little_endian);
                        list.push(result[0]);
                        read += result[1];
                    }
                    props[properties[i].name] = list;
                } else {
                    result = binaryRead(dataview, at + read, properties[i].type, little_endian);
                    props[properties[i].name] = result[0];
                    read += result[1];
                }
            }
            return { props, read };
        }

        function parseBinary(data: ArrayBuffer) {
            var buffer: IData = { indices: [], vertices: [], normals: [], uvs: [], colors: [] };
            var header = parseHeader(bin2strHeader(data));
            let { format, elements } = header;
            var little_endian = (format === 'binary_little_endian');
            var body = new DataView(data, header.headerLength);
            var result, loc = 0;
            for (var i = 0; i < elements.length; i++) {
                let currentElement = elements[i];
                for (var currentElementCount = 0; currentElementCount < currentElement.count; currentElementCount++) {
                    result = binaryReadElement(body, loc, currentElement.properties, little_endian);
                    loc += result.read;
                    handleElement(buffer, currentElement.name, result.props);
                }
            }
            return postProcess(buffer);
        }

        var geometry;
        if (data instanceof ArrayBuffer) {
            geometry = isASCII(data) ? parseASCII(bin2str(data)) : parseBinary(data);
        } else {
            geometry = parseASCII(data);
        }
        return geometry;
    }
}