const mongoose = require("mongoose")

const schema = mongoose.Schema({
  description: String,
  createdAt: Date,
  finishedAt: Date,
});

module.exports = mongoose.model("Task", schema);
