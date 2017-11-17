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

exports.show_my_absence = function (req, res){
  var current_page = 1, prev_page = null, prev_page_url = null, per_page = 3
    if (typeof req.query.page === 'undefined') {
      current_page = 1
    } else {
      current_page = req.query.page
      if(current_page > 1) {
        prev_page = current_page-1
      }
    }

    if(prev_page !== null){
      prev_page_url = config_http.url+'/absence/me?page='+prev_page
    } 

    if (typeof req.query.per_page  !== 'undefined') {
      per_page = parseInt(req.query.per_page)
    }
  Absence.find({
    user_id: req.user.id
  })
  .count(function (err, count){
    Absence.find({
    user_id: req.user.id
    })
    .skip(per_page*(current_page-1))
    .limit(per_page)
    .exec(function (err, absence) {
      if (err) throw err;
      var output = {},
          total = count,
          last_page = ((total-(total%per_page))/per_page)+1,
          next_page_url = config_http.url+'/absence/me?page='+(current_page+1),
          from = (per_page*(current_page-1))+1,
          data = absence

      var to = (per_page*current_page)
      if (total<to) {
        to = total
      }

      output.total = total
      output.per_page = per_page
      output.current_page = current_page
      output.last_page = last_page
      output.next_page_url = next_page_url
      output.prev_page_url = prev_page_url
      output.from = from
      output.to = to
      output.data = data

      res.send(output)
    })
  })
  
}