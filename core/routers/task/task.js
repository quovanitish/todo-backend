const express = require("express");
const router = express.Router();
const Task = require("../../db/models/task/task");
const auth = require("../../middleware/auth/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id/title", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    task.title = req.body.title;
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id/desc", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    task.description = req.body.description;
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id/status", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    task.status = req.body.status;
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
