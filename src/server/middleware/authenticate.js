
const authenticationService = require("../services/authentication");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = await authenticationService.verifyJwt(token);
      return next();
    } catch {
      return res.sendStatus(403);
    }
  }

  return res.sendStatus(401);
};
