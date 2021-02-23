export class SerializableObject {
    serialize() {

    }

    deserialize() {

    }

    clone() {

    }
}

export interface SerializedProperty {
    typeName?: string;
    data: any;
}

export interface SerializedObject {
    version?: number;
    typeName?: string;
    properties: { [propertyName: string]: SerializedProperty };
}

export class Serializer {
    private static _ins: Serializer;
    static get ins() {
        if (this._ins == null) {
            this._ins = new Serializer();
        }
        return this._ins;
    }

    serializeObject(obj: SerializableObject): SerializedObject {
        const json: SerializedObject = {
            typeName: obj.constructor.name,
            properties: {}
        };
        Serializer.serializeProperties(obj, json);
        return json;
    }

    deserializeObject(obj: SerializableObject, json: SerializedObject): SerializableObject {
        return null;
    }

    private serializerFactory: { [tyep: string]: (obj: object) => SerializedObject } = {};
    private deserializerFactory: { [tyep: string]: (obj: SerializedObject) => object } = {};

    registe(typename: string, serializer: (obj: object) => SerializedObject, deserializer: (obj: SerializedObject) => object) {
        this.serializerFactory[typename] = serializer;
        this.deserializerFactory[typename] = deserializer;
    }

    getTypeFactory(type: string) {
        return this.serializerFactory[type];
    }

    private static serializeObject = (obj: SerializableObject) => {
        const json: SerializedObject = {
            typeName: obj.constructor.name,
            properties: {}
        };
        Serializer.serializeProperties(obj, json);
    }

    private static serializeProperties = (obj: SerializableObject, json: SerializedObject) => {
        for (const key of Object.keys(obj)) {
            const unSerializable = Attribute.meta_unserialize(obj, key);
            if (unSerializable) {
                continue;
            }
            const property = Reflect.get(obj, key);
            if (typeof (property) === "function" || property === undefined || property === null) {
                continue;
            }
            const typeName = Serializer.getPropertyTypeName(property);

            const serializedData = Serializer.serializeProperty(property, typeName);
            json.properties[key] = serializedData;
        }
    }

    private static serializeProperty(data: any, _typeName?: string): SerializedProperty {
        const typeName = _typeName || Serializer.getPropertyTypeName(data);
        const factory = Serializer.ins.getTypeFactory(typeName);
        if (factory != null) {
            // TODO will it be necessary to apply ID transforms to low level properties??
            // I don't see another use case other than preserving asset references for now.
            return { typeName: typeName, data: factory(data) };
        } else {
            console.log(`Cannot serialize property of type '${typeName}'`);
            return null;
        }
    }

    private static getPropertyTypeName(property: any) {
        let typeName = `${typeof (property)}`;
        if (typeName === "object") {
            return property.constructor.name as string;
        } else {
            typeName = typeName[0].toUpperCase() + typeName.substring(1);
            return typeName;
        }
    }
}

export class Attribute {
    static unserialize(target: Function, att: string, descriptor: any) {
        setMetadata(target, att, "unserialize", true);
    }

    static meta_unserialize(target: object, att: string): boolean {
        return getMetadata("unserialize", target, att);
    }
}

export function setMetadata(target: Function, att: string, metaType: string, value: any) {
    if (target.prototype.metadata == null) target.prototype.metadata = {};
    if (target.prototype.metadata.att == null) target.prototype.metadata.att = {};
    target.prototype.metadata.att.metaType = value;
}
export function getMetadata(metaType: string, target: object, att: string) {
    return (Reflect.getPrototypeOf(target) as ImetaObject).metadata?.att?.metaType;
}

export interface ImetaObject {
    metadata: { [att: string]: { [metaType: string]: any } };
}
