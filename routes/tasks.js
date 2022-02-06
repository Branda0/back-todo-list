const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/form", async (req, res) => {
  console.log(req.fields);
  try {
    const newTask = new Task({
      title: req.fields.title,
      done: req.fields.done,
    });

    await newTask.save();
    res.status(200).json({ message: "new task created" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/delete", async (req, res) => {
  try {
    const taskToDelete = await Task.findOne({ title: req.query.title });

    // CHECK IF A TAKS WITH THIS NAME EXISTS
    if (taskToDelete) {
      await Task.deleteOne({ title: req.query.title });
      res.status(200).json({ message: "Task successfuly deleted" });
    } else {
      res.status(401).json({
        error: { message: "Acces denied, Invalid Task" },
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/update", async (req, res) => {
  try {
    const taskToUpdate = await Task.findOne({ title: req.query.title });

    // CHECK IF A TAKS WITH THIS NAME EXISTS
    if (taskToUpdate) {
      const actualState = taskToUpdate.done;
      taskToUpdate.done = !actualState;
      await taskToUpdate.save();
      res.status(200).json({ message: "Task successfuly updated" });
    } else {
      res.status(401).json({
        error: { message: "Acces denied, Invalid Task" },
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
