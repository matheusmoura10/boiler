type FrameworkFunction<T> = (params: any, body: any) => Promise<T>;

export default interface IFramework {
    create<T>(fn: (params: any, body: any) => Promise<T>): any;
}