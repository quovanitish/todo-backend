const express = require("express");
const router = express.Router();
const db = require("../../db/db");
const Task = require("../../db/models/task/task");

router.post("/tasks", async (req, res) => {
  try {
    const taskCollection = db.collection("tasks");
    const task = new Task(req.body);
    const result = await taskCollection.insertOne(task);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
