import Redis from "ioredis";

const redis = new Redis(process.env.REDIS, {
  lazyConnect: true,
  maxRetriesPerRequest: 5,
  reconnectOnError: (err:Error) => {
    console.error("Redis reconnectOnError:", err);
    return true;
  },
  retryStrategy: (times:number) => Math.min(times * 50, 2000),
});

// Event listeners
redis.on("connect", () => console.log("Redis connected"));
redis.on("ready", () => console.log("Redis ready"));
redis.on("error", (err:Error) => console.error("Redis error:", err));
redis.on("close", () => console.log("Redis connection closed"));
redis.on("reconnecting", () => console.log("Redis reconnecting"));

export default redis;
