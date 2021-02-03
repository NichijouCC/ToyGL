
export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
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