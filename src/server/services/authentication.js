const crypto = require("crypto");
const fs = require("fs");
const {sign, verify} = require("jsonwebtoken");

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

module.exports = {
  hashString: (str) => crypto.createHash('md5').update(str).digest('hex'),
  getJwtForUser: (user) => {
    return sign({_id: user._id.toString(), email: user.email, name: user.name}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 3600,
      subject: user._id.toString()
    });
  },
  verifyJwt: async (jwt) => verify(jwt, RSA_PUBLIC_KEY),
}
