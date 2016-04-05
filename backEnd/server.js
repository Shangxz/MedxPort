var express = require('express');


var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var database = require('./config/db.js');
mongoose.connect(database.url);
var port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


require('./config/routes.js')(app);
app.listen(port);
console.log('Web Server is running on port ' + port);