var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var SwimlaneSchema = new mongoose.Schema({
  laneId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
})
SwimlaneSchema.plugin(autoIncrement.plugin, {model: 'Swimlane', field: 'laneId'});

module.exports = mongoose.model('Swimlane', SwimlaneSchema);
