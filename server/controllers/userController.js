var User = require('../models/user');
var bcrypt = require('bcryptjs');

exports.saveUser = function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save(function(err, result) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      message: 'User created',
      obj: result
    })
  })
}
