const mongoose = require("mongoose");
const express = require("express");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/authentication");
const authenticate = require("./middleware/authenticate");

const port = 3000;
const cors = require('cors')

mongoose.connect(`mongodb://todo-db:27017`, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Welcome to todos!');
  });

  app.use('/auth', authRoutes);
  app.use('/projects', authenticate, projectRoutes);

  app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
  });

});
