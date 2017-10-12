var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var BoardSchema = new mongoose.Schema({
  boardId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lanes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swimlane',
  }]
});
BoardSchema.plugin(autoIncrement.plugin, {model: 'Board', field: 'boardId'});


module.exports = mongoose.model('Board', BoardSchema);
