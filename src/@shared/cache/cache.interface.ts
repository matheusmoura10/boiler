export default abstract class CacheInterface {
  abstract set(key: string, value: any, expire?: number): Promise<void>;
  abstract get(key: string): Promise<any>;
  abstract del(key: string): Promise<void>;
  abstract clear(): Promise<void>;
  abstract getKeys(): Promise<string[]>;
  abstract isProvider(): string;
}
