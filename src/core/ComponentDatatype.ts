
export enum ComponentDatatypeEnum{
    BYTE,
    UNSIGNED_BYTE,
    SHORT,
    UNSIGNED_SHORT,
    INT,
    UNSIGNED_INT,
    FLOAT,
    DOUBLE
}
export class ComponentDatatype{
    static createTypedArray(componentDatatype:ComponentDatatypeEnum, valuesOrLength:any) {
        switch (componentDatatype) {
        case ComponentDatatypeEnum.BYTE:
            return new Int8Array(valuesOrLength);
        case ComponentDatatypeEnum.UNSIGNED_BYTE:
            return new Uint8Array(valuesOrLength);
        case ComponentDatatypeEnum.SHORT:
            return new Int16Array(valuesOrLength);
        case ComponentDatatypeEnum.UNSIGNED_SHORT:
            return new Uint16Array(valuesOrLength);
        case ComponentDatatypeEnum.INT:
            return new Int32Array(valuesOrLength);
        case ComponentDatatypeEnum.UNSIGNED_INT:
            return new Uint32Array(valuesOrLength);
        case ComponentDatatypeEnum.FLOAT:
            return new Float32Array(valuesOrLength);
        case ComponentDatatypeEnum.DOUBLE:
            return new Float64Array(valuesOrLength);
        default:
            throw new Error('componentDatatype is not a valid value.');
        }
    };

}