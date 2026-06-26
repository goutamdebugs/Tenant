import Redis from 'ioredis';

class RedisClient {
  private client: Redis;

  constructor() {
    
    this.client = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

    this.client.on('error', (err) => console.error(' Redis Client Error:', err.message));
    this.client.on('connect', () => console.log(' Redis Connected Successfully '));
  }


  public async connect(): Promise<void> {

    return Promise.resolve();
  }

  public async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public async setEx(key: string, seconds: number, value: string): Promise<void> {
    await this.client.setex(key, seconds, value);
  }

  public async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export const redisClient = new RedisClient();