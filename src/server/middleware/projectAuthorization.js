
const projectsService = require("../services/project");

module.exports = async (req, res, next) => {
  const project = await projectsService.findOne(req.params.project_id)

  if (project.userId !== req.user._id) {
    return res.sendStatus(403);
  }

  req.project = project;

  next();
};
