var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var scrapItemSchema = mongoose.Schema({
        url : String,
        domAlt : [
            {
                name : String,
                node : String,
                type : String
            }
        ]
            
});

module.exports = mongoose.model('scrapItem', scrapItemSchema);