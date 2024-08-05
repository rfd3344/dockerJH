
const express = require('express');
var router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
  res.send('postgres: 111');
});


router.get('/test', async (req, res) => {
  const resp = await checkClient();
  res.send(resp);
});


const { Sequelize } = require('sequelize');

const hostName = process.env.POSTGRESS_HOST || 'localhost';
const hostPort = process.env.POSTGRESS_PORT || '5432';

const sequelize = new Sequelize({
  host: hostName,
  port: hostPort,
  dialect: 'postgres',
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
});

const checkClient = async () => {
  try {
    const resp = await sequelize.authenticate();
    // console.log('SequelizeConnectSuccess', resp);
    return 'SequelizeConnectSuccess>>';
  } catch (error) {
    // console.error('SequelizeConnectError>>', error);
    return 'SequelizeConnectError>>';
  }
};