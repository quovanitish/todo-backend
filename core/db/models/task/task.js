const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    default: "In progress",
  },

  createdOn: {
    type: Date,
    default: Date.now(),
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
