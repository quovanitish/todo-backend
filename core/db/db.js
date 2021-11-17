const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
const db = client.db("todo_app");

module.exports = db;
