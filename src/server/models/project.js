const mongoose = require("mongoose")
const Task = require("./task").schema;
const schema = mongoose.Schema({
  name: String,
  tasks: [Task]
});

module.exports = mongoose.model("Project", schema);
