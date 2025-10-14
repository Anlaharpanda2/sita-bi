import redis from './redis';

/**
 * Cache utility dengan TTL selamanya + auto-sync
 */
export class CacheService {
  private static prefix = 'sita:';
  private static defaultTTL = 0; // 0 = no expiry (selamanya)

  /**
   * Get data from cache
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const prefixedKey = this.prefix + key;
      const data = await redis.get(prefixedKey);
      if (!data) {
        console.log(`[REDIS] GET ${key} -> 404 NOT FOUND`);
        return null;
      }
      console.log(`[REDIS] GET ${key} -> 200 OK`);
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`[REDIS] GET ${key} -> 500 ERROR`, error);
      return null;
    }
  }

  /**
   * Set data in cache with TTL (default = 0 = selamanya)
   */
  static async set(
    key: string,
    value: unknown,
    ttl: number = this.defaultTTL,
  ): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      
      if (ttl === 0) {
        // No expiry - cache selamanya
        await redis.set(this.prefix + key, serialized);
      } else {
        // Dengan expiry
        await redis.setex(this.prefix + key, ttl, serialized);
      }
      
      console.log(`💾 Cached${ttl === 0 ? ' forever' : ` (TTL: ${ttl}s)`}: ${key}`);
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * Delete key from cache
   */
  static async del(key: string): Promise<boolean> {
    try {
      await redis.del(this.prefix + key);
      console.log(`🗑️  Cache invalidated: ${key}`);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  /**
   * Delete multiple keys matching pattern
   */
  static async delPattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(this.prefix + pattern);
      if (keys.length === 0) return 0;
      await redis.del(...keys);
      console.log(`🗑️  Cache pattern cleared: ${pattern} (${keys.length} keys)`);
      return keys.length;
    } catch (error) {
      console.error('Cache delete pattern error:', error);
      return 0;
    }
  }

  /**
   * Check if key exists
   */
  static async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(this.prefix + key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Get or set pattern - get from cache or execute function and cache result
   */
  static async getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = this.defaultTTL,
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key);
    if (cached !== null) {
      console.log(`📦 Cache hit: ${key}`);
      return cached;
    }

    console.log(`💾 Cache miss: ${key}`);
    
    // If not in cache, execute function
    const result = await fn();

    // Store in cache
    await this.set(key, result, ttl);

    return result;
  }

  /**
   * Clear all cache
   */
  static async flush(): Promise<boolean> {
    try {
      const keys = await redis.keys(this.prefix + '*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      console.log(`🗑️  All cache flushed (${keys.length} keys)`);
      return true;
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }
}

export default CacheService;
