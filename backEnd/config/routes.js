
var bcrypt   = require('bcrypt-nodejs');
var scrapList = require('./models/scrapList.js');
var scrapItem = require('./models/scrapItem.js');

module.exports = function(app) {
    app.get('/', function(req,res) {
        res.sendfile('index.html');
    })
    app.get('/api', function(req, res) {
        res.send("u have reached Medx API");
    })
    
    app.post('/api/parseText', function(req,res,next) {
        console.log(req.body);
        next();
    }, function (req,res,next) {
        res.end('{"success" : "well it happened", "status" : 200}');
    }
    
    )
    
}