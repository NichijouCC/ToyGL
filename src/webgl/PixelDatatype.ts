import { GlConstants } from "./GLconstant";
export enum PixelDatatypeEnum
{
    UNSIGNED_BYTE = GlConstants.UNSIGNED_BYTE,
    UNSIGNED_SHORT = GlConstants.UNSIGNED_SHORT,
    UNSIGNED_INT = GlConstants.UNSIGNED_INT,
    FLOAT = GlConstants.FLOAT,
    HALF_FLOAT = GlConstants.HALF_FLOAT_OES,
    UNSIGNED_INT_24_8 = GlConstants.UNSIGNED_INT_24_8,
    UNSIGNED_SHORT_4_4_4_4 = GlConstants.UNSIGNED_SHORT_4_4_4_4,
    UNSIGNED_SHORT_5_5_5_1 = GlConstants.UNSIGNED_SHORT_5_5_5_1,
    UNSIGNED_SHORT_5_6_5 = GlConstants.UNSIGNED_SHORT_5_6_5
}
export namespace PixelDatatypeEnum
{
    export function isPacked(pixelDatatype: PixelDatatypeEnum)
    {
        return pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT_24_8 ||
            pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4 ||
            pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1 ||
            pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5;
    }
    ;
    export function sizeInBytes(pixelDatatype: PixelDatatypeEnum)
    {
        switch (pixelDatatype)
        {
            case PixelDatatypeEnum.UNSIGNED_BYTE:
                return 1;
            case PixelDatatypeEnum.UNSIGNED_SHORT:
            case PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4:
            case PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1:
            case PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5:
            case PixelDatatypeEnum.HALF_FLOAT:
                return 2;
            case PixelDatatypeEnum.UNSIGNED_INT:
            case PixelDatatypeEnum.FLOAT:
            case PixelDatatypeEnum.UNSIGNED_INT_24_8:
                return 4;
        }
    }
    ;
    export function validate(pixelDatatype: PixelDatatypeEnum)
    {
        return ((pixelDatatype === PixelDatatypeEnum.UNSIGNED_BYTE) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT) ||
            (pixelDatatype === PixelDatatypeEnum.FLOAT) ||
            (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT_24_8) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1) ||
            (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5));
    }
}
