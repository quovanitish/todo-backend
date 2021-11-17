const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const userCollection = db.collection("users");
require("dotenv").config();

module.exports = class User {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.tokens = [];
  }

  hashPassword = async () => {
    this.password = await bcrypt.hash(this.password, 8);
  };

  generateAuthToken = async () => {
    console.log(this);
    const token = jwt.sign({}, process.env.SECRET);
    this.tokens.push({ token });

    return token;
  };

  static findByCredentials = async (email, password) => {
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return user;
  };
};
