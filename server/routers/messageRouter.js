module.exports = function(app) {

  var messageController = app.controllers.messageController;

  app.route('/message')
          .get(messageController.getMessages)
          .post(messageController.saveMessage);

  app.route('/message/:id')
          .patch(messageController.updateMessage)
          .delete(messageController.deleteMessage);

};
