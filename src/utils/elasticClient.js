require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.idCYStore,
  },
  auth: {
    username: process.env.usernameCYStore,
    password: process.env.passwordCYStore,
  },
});

module.exports = client;
