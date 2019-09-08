const nJwt = require('njwt');
var config = require('../config');

function jwtAuth(req, res, next) {
  if (req.headers.authorization === undefined) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  nJwt.verify(req.headers.authorization, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Could not authenticate token' });
    }
    req.userId = decoded.body.id;
    next();
  });
}

module.exports = jwtAuth;
