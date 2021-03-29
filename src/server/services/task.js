
const Task = require("../models/task");

module.exports = {
  findOne: async (id) => Task.findOne({_id: id}),
  update: async (task, newDescription, newFinishedAt) => {
    task.description = newDescription;
    task.newFinishedAt = newFinishedAt;
    task.save();
  },
  create: async (project, description) => {
    const task = new Task({
      description: description,
      createdAt: new Date(),
      finishedAt: null,
    });

    project.tasks.push(task);
    await project.save();

    return task;
  },
  deleteOne: async (id) => Task.deleteOne({ _id: id }),
}
