const { User } = require('../db/models/user');
function authenticate(req, res, next) {
  let token = req.header('x-auth');
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.sendStatus(401);
    });
}

module.exports = authenticate;
