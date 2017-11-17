'use strict';

var passport = require('passport');
 
module.exports = function (req, res, next) {
  if(req.cookies) {
    if(typeof(req.cookies._token) !== 'undefined'){
  		req.headers.authorization = 'JWT '+ req.cookies._token;
  	}
  }
  passport.authenticate('jwt', function (error, user, info) {
    if (error) return res.serverError(error);
    if (!user) 
     return res.json({status: false, code: 'unauthorized'});
   req.user = user;
   next();
  })(req, res);
};