export class BinReader {
    private _data: DataView;
    private _arrayBuffer: ArrayBuffer;
    constructor(buf: ArrayBuffer, seek: number = 0) {
        this._arrayBuffer = buf;
        this._byteOffset = seek;
        this._data = new DataView(buf, seek);
    }

    private _byteOffset: number;

    seek(seek: number) {
        this._byteOffset = seek;
    }

    peek(): number {
        return this._byteOffset;
    }

    getPosition(): number {
        return this._byteOffset;
    }

    getLength(): number {
        return this._data.byteLength;
    }

    canread(): number {
        return this._data.byteLength - this._byteOffset;
    }

    skipBytes(len: number) {
        this._byteOffset += len;
    }

    readString(): string {
        const slen = this._data.getUint8(this._byteOffset);
        this._byteOffset++;
        let bs = "";
        for (let i = 0; i < slen; i++) {
            bs += String.fromCharCode(this._data.getUint8(this._byteOffset));
            this._byteOffset++;
        }
        return bs;
    }

    readStrLenAndContent(): string {
        const leng = this.readByte();
        return this.readUint8ArrToString(leng);
    }

    private static _decodeBufferToText(buffer: Uint8Array): string {
        let result = "";
        const length = buffer.byteLength;

        for (let i = 0; i < length; i++) {
            result += String.fromCharCode(buffer[i]);
        }

        return result;
    }

    static utf8ArrayToString(array: Uint8Array | number[]): string {
        const ret: string[] = [];
        for (let i = 0; i < array.length; i++) {
            let cc = array[i];
            if (cc == 0) break;
            let ct = 0;
            if (cc > 0xe0) {
                ct = (cc & 0x0f) << 12;
                cc = array[++i];
                ct |= (cc & 0x3f) << 6;
                cc = array[++i];
                ct |= cc & 0x3f;
                ret.push(String.fromCharCode(ct));
            } else if (cc > 0xc0) {
                ct = (cc & 0x1f) << 6;
                cc = array[++i];
                ct |= (cc & 0x3f) << 6;
                ret.push(String.fromCharCode(ct));
            } else if (cc > 0x80) {
                throw new Error("InvalidCharacterError");
            } else {
                ret.push(String.fromCharCode(array[i]));
            }
        }
        return ret.join("");
    }

    readUint8ArrToString(length: number): string {
        const arr = this.readUint8Array(length);
        return BinReader._decodeBufferToText(arr);
    }

    readSingle(): number {
        const num = this._data.getFloat32(this._byteOffset, true);
        this._byteOffset += 4;
        return num;
    }

    readDouble(): number {
        const num = this._data.getFloat64(this._byteOffset, true);
        this._byteOffset += 8;
        return num;
    }

    readInt8(): number {
        const num = this._data.getInt8(this._byteOffset);
        this._byteOffset += 1;
        return num;
    }

    readUInt8(): number {
        // LogManager.Warn(this._data.byteLength + "  @@@@@@@@@@@@@@@@@  " + this._seek);
        const num = this._data.getUint8(this._byteOffset);
        this._byteOffset += 1;
        return num;
    }

    readInt16(): number {
        // LogManager.Log(this._seek + "   " + this.length());
        const num = this._data.getInt16(this._byteOffset, true);
        this._byteOffset += 2;
        return num;
    }

    readUInt16(): number {
        const num = this._data.getUint16(this._byteOffset, true);
        this._byteOffset += 2;
        // LogManager.Warn("readUInt16 " + this._seek);
        return num;
    }

    readInt32(): number {
        const num = this._data.getInt32(this._byteOffset, true);
        this._byteOffset += 4;
        return num;
    }

    readUint32(): number {
        const num = this._data.getUint32(this._byteOffset, true);
        this._byteOffset += 4;
        return num;
    }

    readUint8Array(length: number): Uint8Array {
        const value = new Uint8Array(this._arrayBuffer, this._byteOffset, length);
        this._byteOffset += length;
        return value;
    }

    readUint8ArrayByOffset(target: Uint8Array, offset: number, length: number = 0): Uint8Array {
        if (length < 0) length = target.length;
        for (let i = 0; i < length; i++) {
            target[i] = this._data.getUint8(offset);
            offset++;
        }
        return target;
    }

    public set position(value: number) {
        this.seek(value);
    }

    public get position(): number {
        return this.peek();
    }

    readBoolean(): boolean {
        return this.readUInt8() > 0;
    }

    readByte(): number {
        return this.readUInt8();
    }

    readUnsignedShort(): number {
        return this.readUInt16();
    }

    readUnsignedInt(): number {
        return this.readUint32();
    }

    readFloat(): number {
        return this.readSingle();
    }

    readSymbolByte(): number {
        return this.readInt8();
    }

    readShort(): number {
        return this.readInt16();
    }

    readInt(): number {
        return this.readInt32();
    }
}
export class BinWriter {
    _buf: Uint8Array;
    private _data: DataView;
    private _length: number;
    private _seek: number;

    constructor() {
        const buf = new ArrayBuffer(1024);
        this._length = 0;
        this._buf = new Uint8Array(buf);
        this._data = new DataView(this._buf.buffer);
        this._seek = 0;
    }

    private sureData(addlen: number): void {
        let nextlen = this._buf.byteLength;
        while (nextlen < this._length + addlen) {
            nextlen += 1024;
        }
        if (nextlen != this._buf.byteLength) {
            const newbuf = new Uint8Array(nextlen);
            for (let i = 0; i < this._length; i++) {
                newbuf[i] = this._buf[i];
            }
            this._buf = newbuf;
            this._data = new DataView(this._buf.buffer);
        }
        this._length += addlen;
    }

    getLength(): number {
        return length;
    }

    getBuffer(): ArrayBuffer {
        return this._buf.buffer.slice(0, this._length);
    }

    seek(seek: number) {
        this._seek = seek;
    }

    peek(): number {
        return this._seek;
    }

    writeInt8(num: number): void {
        this.sureData(1);
        this._data.setInt8(this._seek, num);
        this._seek++;
    }

    writeUInt8(num: number): void {
        this.sureData(1);
        this._data.setUint8(this._seek, num);
        this._seek++;
    }

    writeInt16(num: number): void {
        this.sureData(2);
        this._data.setInt16(this._seek, num, true);
        this._seek += 2;
    }

    writeUInt16(num: number): void {
        this.sureData(2);
        this._data.setUint16(this._seek, num, true);
        this._seek += 2;
    }

    writeInt32(num: number): void {
        this.sureData(4);
        this._data.setInt32(this._seek, num, true);
        this._seek += 4;
    }

    writeUInt32(num: number): void {
        this.sureData(4);
        this._data.setUint32(this._seek, num, true);
        this._seek += 4;
    }

    writeSingle(num: number): void {
        this.sureData(4);
        this._data.setFloat32(this._seek, num, true);
        this._seek += 4;
    }

    writeDouble(num: number): void {
        this.sureData(8);
        this._data.setFloat64(this._seek, num, true);
        this._seek += 8;
    }

    writeStringAnsi(str: string): void {
        const slen = str.length;
        this.sureData(slen + 1);
        this._data.setUint8(this._seek, slen);
        this._seek++;
        for (let i = 0; i < slen; i++) {
            this._data.setUint8(this._seek, str.charCodeAt(i));
            this._seek++;
        }
    }

    writeStringUtf8(str: string) {
        const bstr = BinWriter.stringToUtf8Array(str);
        this.writeUInt8(bstr.length);
        this.writeUint8Array(bstr);
    }

    static stringToUtf8Array(str: string): number[] {
        const bstr: number[] = [];
        for (let i = 0; i < str.length; i++) {
            const c = str.charAt(i);
            const cc = c.charCodeAt(0);
            if (cc > 0xffff) {
                throw new Error("InvalidCharacterError");
            }
            if (cc > 0x80) {
                if (cc < 0x07ff) {
                    const c1 = (cc >>> 6) | 0xc0;
                    const c2 = (cc & 0x3f) | 0x80;
                    bstr.push(c1, c2);
                } else {
                    const c1 = (cc >>> 12) | 0xe0;
                    const c2 = ((cc >>> 6) & 0x3f) | 0x80;
                    const c3 = (cc & 0x3f) | 0x80;
                    bstr.push(c1, c2, c3);
                }
            } else {
                bstr.push(cc);
            }
        }
        return bstr;
    }

    writeStringUtf8DataOnly(str: string) {
        const bstr = BinWriter.stringToUtf8Array(str);
        this.writeUint8Array(bstr);
    }

    writeUint8Array(array: Uint8Array | number[], offset: number = 0, length: number = -1) {
        if (length < 0) length = array.length;
        this.sureData(length);
        for (let i = offset; i < offset + length; i++) {
            this._data.setUint8(this._seek, array[i]);
            this._seek++;
        }
    }

    public get length(): number {
        return this._seek;
    }

    writeByte(num: number): void {
        this.writeUInt8(num);
    }

    writeBytes(array: Uint8Array | number[], offset: number = 0, length: number = 0) {
        this.writeUint8Array(array, offset, length);
    }

    writeUnsignedShort(num: number): void {
        this.writeUInt16(num);
    }

    writeUnsignedInt(num: number): void {
        this.writeUInt32(num);
    }

    writeFloat(num: number): void {
        this.writeSingle(num);
    }

    writeUTFBytes(str: string): void {
        const strArray = BinWriter.stringToUtf8Array(str);
        this.writeUint8Array(strArray);
    }

    writeSymbolByte(num: number): void {
        this.writeInt8(num);
    }

    writeShort(num: number): void {
        this.writeInt16(num);
    }

    writeInt(num: number): void {
        this.writeInt32(num);
    }
}
