var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
  });
}

exports.signIn = function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    if(!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }

    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    })
  })

}
