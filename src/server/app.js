const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");

const port = 3000;
const cors = require('cors')

mongoose.connect(`mongodb://todo-db:27017`, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Welcome to todos!');
  });

  app.use('/projects', routes);

  app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
  });

});
