const Redis = require("redis");

// Create a Redis client
const client = Redis.createClient({
  socket: {
    host: "127.0.0.1", // Redis host
    port: 6379, // Redis port
  },
});

// Connect to Redis
client.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

// Event listeners
client.on("connect", () => {
  console.log("Connected to Redis");
});
client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

// Set data in Redis
async function setdata(key, value) {
  try {
    const res = await client.set(key, value);
    console.log(`Set key: ${key}, value: ${value}`);
    return res;
  } catch (err) {
    console.error("Error setting data in Redis:", err);
    throw err;
  }
}

// Get data from Redis
async function getdata(key) {
  try {
    const res = await client.get(key);
    console.log(`Retrieved key: ${key}, value: ${res}`);
    return res;
  } catch (err) {
    console.error("Error retrieving data from Redis:", err);
    throw err;
  }
}

// Export functions
module.exports = {
  setdata,
  getdata,
};
