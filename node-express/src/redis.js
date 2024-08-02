
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('redis: 111');
});


router.get('/check', async (req, res) => {
  const status = await checkClient();
  res.send('redis status: ' + status);
});



const { createClient } = require('redis');

const checkClient = async () => {
  const client = createClient({
    url: 'redis://localhost:6379'
  });

  client.on('error', err => console.log('Redis Client Error', err));
  await client.connect();

  await client.set('status', 'Redis Connected');
  const value = await client.get('status');
  return value;
};

// TODOS: check how to create single instance for async function
// const connect = async () => {
//   // let client = null;
//   // try {

//   const client = createClient({
//     url: 'redis://localhost:6379'
//   });

//   client.on('error', err => { throw new Error(err); });
//   await client.connect();

//   // } catch (e) {
//   //   console.warn('error:', e);
//   // }
//   console.warn('client', client);
//   return client;
// };

// const instance = connect();