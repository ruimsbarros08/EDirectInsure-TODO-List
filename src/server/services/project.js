
const Project = require("../models/project");

module.exports = {
  findAll: async () => Project.find(),
  findOne: async (id) => Project.findOne({_id: id}),
  deleteOne: async (id) => Project.deleteOne({ _id: id }),
  update: async (project, newName) => {
    project.name = newName;
    project.save();
  },
  create: async (name) => {
    const project = new Project({
      name: name,
      tasks: []
    });

    return project.save();
  }
}
