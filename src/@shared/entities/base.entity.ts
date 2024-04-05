export abstract class BaseEntity {

    protected id: string;


    constructor(id: string) {
        this.id = id;
    }


    get getId(): string {
        return this.id;
    }

    abstract validar(): void;

    toArray(): Record<string, unknown> {
        return Object.getOwnPropertyNames(this)
            .filter(property => property !== 'constructor')
            .reduce((obj, property) => {
                // @ts-ignore
                const value = this[property];

                if (value instanceof BaseEntity) {
                    obj[this.transformPropertyName(property)] = value.toArray();
                } else {
                    obj[this.transformPropertyName(property)] = value;
                }
                return obj;
            }, {} as Record<string, unknown>);
    }

    private transformPropertyName(property: string): string {
        return property
            .replace(/([A-Z])/g, '_$1')
            .replace(/^get_/, '')
            .replace(/^_/, '')
            .toLowerCase();
    }
}