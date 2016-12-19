var Message = require('../models/message');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.authentication = function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if(err) {
      return res.status(401).json({
        title: 'Not authenticated!',
        error: err
      })
    }
    next();
  });
}

exports.getMessages = function(req, res, next) {
  Message.find()
      .populate('user', 'firstName')
      .exec(function(err, messages) {
        if(err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }

        res.status(200).json({
          message: 'Success',
          obj: messages
        })

      });
};

exports.saveMessage = function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    var message = new Message({
      content: req.body.content,
      user: user
    });

    message.save(function(err, result) {

      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      user.messages.push(result);
      user.save();
      res.status(201).json({
        title: 'Message stored',
        obj: result
      });

    });
  });
}

exports.updateMessage = function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    if(!message) {

      return res.status(500).json({
        title: 'No message found!',
        error: {message: 'Message not found!'}
      });

    }

    message.content = req.body.content;
    message.save(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      res.status(200).json({
        title: 'Message updated',
        obj: result
      });
    })

  })
}

exports.deleteMessage = function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    if(!message) {

      return res.status(500).json({
        title: 'No message found!',
        error: {message: 'Message not found!'}
      });

    }

    message.content = req.body.content;
    message.remove(function(err, result) {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      res.status(200).json({
        title: 'Message deleted',
        obj: result
      });
    })

  })
}
