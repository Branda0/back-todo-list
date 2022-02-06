const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: String,
  done: Boolean,
});

module.exports = Task;
