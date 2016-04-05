var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scrapListSchema = mongoose.Schema(
    [
        {
            url : String,
            parentUrl : String,
            childUrl : [
                String
            ],
            _storeId : Schema.Types.ObjectId
        }
    ]
);

module.exports = mongoose.model('scrapList', scrapListSchema);