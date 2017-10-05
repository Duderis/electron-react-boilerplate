var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    value: { type:String, required:true },
    userId: { type:String, required:true },
    clientId: { type:String, required:true }
});

//TODO: hash value
module.exports = mongoose.model('Token', TokenSchema);
