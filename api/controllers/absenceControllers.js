'use strict';
var mongoose = require('mongoose'),
	CipherService = require('../services/CipherService'),
	bcrypt = require('bcrypt-nodejs'),
	https = require('https'),
	Absence = mongoose.model('Absence');

//functions
var save_absence = function (req, res) {
	var newAbsence = new Absence({
            user_id: req.user.id,
            type_absence: req.body.type,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            info_absence: req.body.info,
            status: 1
      });

      newAbsence.save(function(err, absence){
        if (err) {
            console.log('error save absence!')
            return res.json({success: false, msg: 'Invalid Saved'});
        }
        res.json({
            success: true
        });
      });
}

exports.create_a_absence = function (req, res) {
      if (!req.body.type 
          || !req.body.start_date 
          || !req.body.end_date
          || !req.body.info) {
            console.log(req.body)
            res.json({success: false, msg: 'Input must not empty'});
      } else {
            save_absence(req, res);
      }
}

