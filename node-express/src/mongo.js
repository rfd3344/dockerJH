
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('mongo: 111');
});



router.get('/test', async (req, res) => {
  const resp = await checkClient();
  res.send(resp);
});

router.get('/add', async (req, res) => {
  const resp = await addDoc({ time: Date() });
  res.send(resp);
});

router.get('/get', async (req, res) => {
  const resp = await findDocs();
  res.send(resp);
});


const { MongoClient } = require('mongodb');


const hostName = process.env.MONGO_HOST || 'localhost';
const hostPort = process.env.MONGO_PORT || '27017';

const client = new MongoClient(`mongodb://${hostName}:${hostPort}`);

const checkClient = async () => {
  const resp = await client.connect()
    .then(() => 'MongoConnected>> ')
    .catch(err => 'MongoConnectError>> ')
    .finally(() => client.close());

  return resp;
};

const addDoc = async (doc = {}) => {
  await client.connect();
  const collection = client.db().collection('collection');
  const resp = await collection.insertOne(doc);

  return resp;
};


const findDocs = async (filter = {}) => {
  await client.connect();
  const collection = client.db().collection('collection');
  const resp = await collection.find(filter).toArray();

  return resp;
};