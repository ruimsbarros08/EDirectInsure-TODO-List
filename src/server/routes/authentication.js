const express = require("express");
const userService = require("../services/user");
const authenticationService = require("../services/authentication");

const router = express.Router();

router.post('/register', async (req, res) => {
  let user = await userService.create(req.body.email, req.body.password, req.body.name);
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await userService.findByEmailAndPassword(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).send({error: 'Invalid credentials'});
  }

  res.status(200).json({
    idToken: authenticationService.getJwtForUser(user),
    expiresIn: 3600
  });
});

module.exports = router;
