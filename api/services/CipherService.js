'use strict';

var jwt = require('jsonwebtoken'),
	config = require('../../config/passport');

module.exports = {
    secret: config.jwtSettings.secret,
    issuer: config.jwtSettings.issuer,
    audience: config.jwtSettings.audience,

    /**
     * Create a token based on the passed user
     * @param user
     */
    createToken: function(user)
    {
        return jwt.sign({
                user: user
            },
            config.jwtSettings.secret,
            {
                algorithm: config.jwtSettings.algorithm,
                expiresIn: config.jwtSettings.expiresInMinutes,
                issuer: config.jwtSettings.issuer,
                audience: config.jwtSettings.audience
            }
        );
    }
};