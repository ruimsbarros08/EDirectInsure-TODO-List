const mongoose = require("mongoose");
const express = require("express");
const projectsRoutes = require("./routes/projects");
const tasksRoutes = require("./routes/tasks");

const port = 3000;
const cors = require('cors')

mongoose.connect(`mongodb://todo-db:27017`, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Welcome to todos!');
  });

  app.use('/projects', projectsRoutes);
  app.use('/projects/:project_id/tasks', tasksRoutes);

  app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
  });

});
