'use strict';

/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES_IN_MINUTES = 60 * 60 * 12;
var SECRET = "de3I&U$Wfda@B3iI1yxj9483gk!dskDJae@44gz6#fTbNg7jO%41EAtl*20)Jd905^i8479AS(FjM";
var ALGORITHM = "HS256";
var ISSUER = "purbalinggakab.go.id";
var AUDIENCE = "purbalinggakab.go.id";


/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}
 
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
 
module.exports.jwtSettings = {
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};