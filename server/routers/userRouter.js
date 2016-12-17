module.exports = function(app) {

  var userController = app.controllers.userController;

  app.route('/user')
          .post(userController.saveUser);
};
