const express = require("express");
const projectService = require("../services/project");
const taskService = require("../services/task");

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const project = await projectService.findOne(req.params.project_id);
    res.send(await taskService.create(project, req.body.description));
  } catch {
    res.status(404);
    res.send({error: "Project does not exist"});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await taskService.findOne(req.params.id);
    res.send(await taskService.update(task, req.body.description, req.body.finishedAt));
  } catch {
    res.status(404);
    res.send({error: "Task does not exist"});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await taskService.deleteOne(req.params.id);
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Task does not exist" });
  }
});

module.exports = router;
