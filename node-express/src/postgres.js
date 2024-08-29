
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

router.get('/add', async (req, res) => {
  const resp = await addUser();
  res.send(resp);
});


const { Sequelize, DataTypes, Model } = require('sequelize');

const hostName = process.env.POSTGRESS_HOST || 'localhost';
const hostPort = process.env.POSTGRESS_PORT || '5432';

const sequelize = new Sequelize({
  host: hostName,
  port: hostPort,
  dialect: 'postgres',
  database: 'demo_db',
  username: 'admin',
  password: 'admin',
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


const createTable = async () => {

  // const User = sequelize.define('User', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   },
  //   username: DataTypes.STRING,
  //   age: {
  //     type: DataTypes.STRING
  //   },
  // });

  class User extends Model { }
  User.init(
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
    },
  );

  await sequelize.sync({ force: true });
  console.log("User:", User);
  return User;
};

const addUser = async () => {
  // await sequelize.sync({ force: true });
  return await createTable();

  const jane = await User.create({
    username: 'janedoe',
    age: 11,
  });
  console.log("Jane's auto-generated ID:", jane.id);
  return;
  const resp = await sequelize.sync({ force: true });
  return jane;
};