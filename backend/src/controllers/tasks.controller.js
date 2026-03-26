const tasksService = require("../services/tasks.service");
const { taskSchema } = require("../schemas/task.schema");

async function getAllTasks(req, res, next) {
  try {
    const tasks = tasksService.getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const validatedData = taskSchema.parse(req.body);
    const newTask = tasksService.createTask(validatedData);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const validatedData = taskSchema.parse(req.body);
    const updatedTask = tasksService.updateTask(id, validatedData);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    tasksService.deleteTask(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
