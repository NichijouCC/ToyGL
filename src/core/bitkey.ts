// 每个组件占一个二进制位，50个二进制位作为一个group，如果component数量超过50的话。
// Reference:https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers

export class Bitkey {
    private static currentGroupIndex = 0;
    private static currentItemIndex = 0;
    readonly groupIndex: number;
    private itemIndex: number;
    readonly value: number;
    private constructor(groupIndex: number, itemIndex: number) {
        this.groupIndex = groupIndex;
        this.itemIndex = itemIndex;
        this.value = 1 << itemIndex;
    }

    static create() {
        const newKey = this.currentItemIndex++;
        if (newKey > 50) {
            this.currentGroupIndex++;
            this.currentItemIndex = 0;
        }
        return new Bitkey(this.currentGroupIndex, this.currentItemIndex);
    }
}

export class UniteBitkey {
    private keysMap: { [groupKey: number]: number; } = {};
    addBitKey(key: Bitkey) {
        const groupKey = key.groupIndex;
        if (this.keysMap[groupKey] == null) {
            this.keysMap[groupKey] = 0;
        }
        const currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue | key.value;
    }

    removeBitKey(key: Bitkey) {
        const groupKey = key.groupIndex;
        const currentValue = this.keysMap[groupKey];
        this.keysMap[groupKey] = currentValue & ~key.value;
    }

    containe(otherKey: UniteBitkey) {
        const keys = Object.keys(otherKey.keysMap);
        let key, otherValue, thisValue, becontained;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i] as any;
            otherValue = otherKey.keysMap[key];
            thisValue = this.keysMap[key];
            becontained = thisValue != null && ((otherValue & thisValue) == otherValue);
            if (!becontained)
                return false;
        }
        return true;
    }
}
