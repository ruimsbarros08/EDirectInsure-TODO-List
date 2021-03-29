const express = require("express");
const projectService = require("./services/project");
const taskService = require("./services/task");

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await projectService.findAll();
  res.send(projects);
});

router.post('/', async (req, res) => {
  res.send(await projectService.create(req.body.name));
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectService.findOne(req.params.id);
    res.send(project);
  } catch {
    res.status(404);
    res.send({error: "Project does not exist"});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await projectService.findOne(req.params.id);

    if (req.body.name) {
      await projectService.update(project, req.body.name);
    }

    res.send(project);
  } catch {
    res.status(404);
    res.send({error: "Project does not exist"});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await projectService.deleteOne(req.params.id);
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Project does not exist" });
  }
});

router.post('/:project_id/tasks', async (req, res) => {
  try {
    const project = await projectService.findOne(req.params.project_id);
    res.send(await taskService.create(project, req.body.description));
  } catch {
    res.status(404);
    res.send({error: "Project does not exist"});
  }
});

router.put("/:project_id/tasks/:id", async (req, res) => {
  try {
    res.send(await taskService.findOneAndUpdate(req.params.project_id, req.params.id, req.body.description, req.body.createdAt, req.body.finishedAt));
  } catch {
    res.status(404);
    res.send({error: "Task does not exist"});
  }
});

router.delete("/:project_id/tasks/:id", async (req, res) => {
  try {
    await taskService.deleteOne(req.params.project_id, req.params.id);
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Task does not exist" });
  }
});

module.exports = router;
