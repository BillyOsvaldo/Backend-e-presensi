'use strict';
module.exports = function(app) {
  var absence = require('../controllers/absenceControllers'),
  isAuthenticated = require('../polices/isAuthenticated');

  app.route('/absence/add')
    .post(isAuthenticated, absence.create_a_absence)
  app.route('/absence/me')
    .get(isAuthenticated, absence.show_my_absence)
};