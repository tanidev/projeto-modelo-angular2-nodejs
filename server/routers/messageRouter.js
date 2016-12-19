module.exports = function(app) {

  var messageController = app.controllers.messageController;

  app.use('/message', messageController.authentication)

  app.route('/message')
          .get(messageController.getMessages)
          .post(messageController.saveMessage);

  app.route('/message/:id')
          .patch(messageController.updateMessage)
          .delete(messageController.deleteMessage);

};
