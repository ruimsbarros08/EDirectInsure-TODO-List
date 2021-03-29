
const Project = require("../models/project");

module.exports = {
  findAll: async (userId) => Project.find({userId: userId}),
  findOne: async (id) => Project.findOne({_id: id}),
  deleteOne: async (id) => Project.deleteOne({ _id: id }),
  update: async (project, newName) => {
    project.name = newName;
    project.save();
  },
  create: async (name, userId) => {
    const project = new Project({
      name: name,
      userId: userId,
      tasks: []
    });

    return project.save();
  }
}
