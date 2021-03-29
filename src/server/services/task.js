const Task = require("../models/task");
const Project = require("../models/project");

module.exports = {
  findOneAndUpdate: async (projectId, id, description, createdAt, finishedAt) => {
    return new Promise(((resolve, reject) => {
      Project.findById(projectId, async (err, doc) => {
        if (err) {
          reject(err);
        }

        const task = doc.tasks.id(id);

        task.description = description;
        task.createdAt = createdAt;
        task.finishedAt = finishedAt;

        await doc.save();
        resolve(task);
      });
    }));
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
  deleteOne: async (projectId, id) => {
    return new Promise(((resolve, reject) => {
      Project.findOneAndUpdate({'tasks._id': id}, {
        $pull: {tasks: {_id: id}}
      }, {new: true}, (err, doc) => {
        if (err) {
          reject(err);
        }

        resolve(doc);
      });
    }));
  },
}
