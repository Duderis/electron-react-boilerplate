const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const SwimlaneSchema = new mongoose.Schema({
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
  parentBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
});
SwimlaneSchema.plugin(autoIncrement.plugin, { model: 'Swimlane', field: 'laneId' });

SwimlaneSchema.pre('remove', function (next) {
  this.model('Board').update(
    { lanes: this._id }, // findcondition
    { $pull: { lanes: this._id } },
    { multi: true },
    next
  );
});

module.exports = mongoose.model('Swimlane', SwimlaneSchema);
