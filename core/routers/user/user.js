const express = require("express");
const router = express.Router();
const db = require("../../db/db");
const User = require("../../db/models/user/user");

router.post("/users", async (req, res) => {
  try {
    const userCollection = db.collection("users");
    const user = new User(req.body);
    await user.hashPassword();
    const token = await user.generateAuthToken();
    const result = await userCollection.insertOne(user);

    res.status(201).send({ result, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    res.status(200).send({ user });
  } catch (err) {
    res.status(401).send(err);
  }
});
module.exports = router;
