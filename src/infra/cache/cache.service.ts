import CacheInterface from "../../@shared/cache/cache.interface";
import MemoriaCache from "./memoria.cache";
import RedisCache from "./redis.cache";
import * as dotenv from "dotenv";

dotenv.config();

export default class CacheService implements CacheInterface {
  private cacheProvider: CacheInterface;

  constructor() {
    this.cacheProvider = this.createCacheProvider();
  }

  private createCacheProvider(): CacheInterface {
    const cacheType = process.env.CACHE_DRIVER;
    switch (cacheType) {
      case "redis":
        return new RedisCache();
      case "memoria":
        return new MemoriaCache();
      default:
        throw new Error("Cache não configurado");
    }
  }

  set(key: string, value: any, expire?: number): Promise<void> {
    return this.cacheProvider.set(key, value, expire);
  }
  get(key: string): Promise<any> {
    return this.cacheProvider.get(key);
  }
  del(key: string): Promise<void> {
    return this.cacheProvider.del(key);
  }
  clear(): Promise<void> {
    return this.cacheProvider.clear();
  }

  getKeys(): Promise<string[]> {
    return this.cacheProvider.getKeys();
  }

  isProvider(): string {
    return this.cacheProvider.isProvider();
  }
}

export const cacheService = new CacheService();
