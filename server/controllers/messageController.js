var Message = require('../models/message');

exports.getMessages = function(req, res, next) {
  Message.find()
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

  var message = new Message({
    content: req.body.content
  });

  message.save(function(err, result) {

    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(201).json({
      title: 'Message stored',
      obj: result
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
