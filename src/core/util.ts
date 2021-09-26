export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(key => {
            if (key !== "constructor" && key !== "prototype" && key !== "name") {
                let descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, key)
                Object.defineProperty(derivedCtor.prototype, key, descriptor);
            }
        });
    });
}

export function Mixin<T extends Array<any>>(constructors: T) {
    const mixClass = class {
        constructor() {
            constructors.forEach((baseCtor: any) => {
                baseCtor.apply(this);
                // Reflect.apply(baseCtor, this, []);
                // Reflect.construct(baseCtor, [], this);
            });
        }
    };
    constructors.forEach((c: any) => {
        Object.assign(mixClass.prototype, c.prototype);
    });
    return mixClass as any;
}

export function copyProperties(target: any, source: any) {
    for (const key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            const desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
