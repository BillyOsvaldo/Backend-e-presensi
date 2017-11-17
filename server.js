var express = require('express'),
  cookies = require("cookie-parser"),
  app = express(),
  port = process.env.PORT || 3001;
  mongoose = require('mongoose'),
  Absence = require('./api/models/absence'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/epresensi'); 

app.use(cookies());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesAbsence = require('./api/routes/absenceRoutes'); //importing route
routesAbsence(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);