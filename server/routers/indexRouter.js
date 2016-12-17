module.exports = function(app) {

  var indexController = app.controllers.indexController;
  app.route("/api")
          .get(indexController.index);

};
