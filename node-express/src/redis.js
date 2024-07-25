
const express = require('express');
var router = express.Router();


const redis = require('redis');
// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost', // Redis server hostname (for Docker, use the service name if using Docker Compose)
  port: 6379         // Redis server port
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Middleware to check if data exists in Redis cache
const cacheMiddleware = (req, res, next) => {
  next();
  const { key } = req.query;

  redisClient.get(key, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data) {
      return res.status(200).json({ source: 'cache', data: JSON.parse(data) });
    }
    next();
  });
  // const { key } = req.query;

};

router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to get data, using the cache middleware
router.get('/data', cacheMiddleware, async (req, res) => {

  // const client = redis.createClient({
  //   url: ' redis://localhost:6379',
  // });

  // client.on('error', function (error) {
  //   console.error(error);
  // });

  // await client.set('bob', 'i am bob', redis.print);

  res.send('Hello World!');
});

module.exports = router;