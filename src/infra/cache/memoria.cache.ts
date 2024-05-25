import CacheInterface from "../../@shared/cache/cache.interface";

export default class MemoriaCache implements CacheInterface {
  private cache: Map<string, any> = new Map();

  async set(key: string, value: any, expire: number = 1000): Promise<void> {
    this.cache.set(key, value);

    if (expire) {
      setTimeout(() => {
        this.cache.delete(key);
      }, expire * 1000);
    }
  }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const value = this.cache.get(key);
      if (!value) {
        reject("Chave não encontrada");
      }
      resolve(value);
    });
  }

  del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.cache.delete(key)) {
        reject("Chave não encontrada");
      }
      resolve();
    });
  }

  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cache.clear();
      resolve();
    });
  }

  getKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      resolve(Array.from(this.cache.keys()));
    });
  }

  isProvider(): string {
    return "Memoria";
  }
}
