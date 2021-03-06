const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  points: {
    type: Number,
    required: false
  },
  duration: {
    type: Number,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parentBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  },
  parentSwimlane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swimlane'
  }
});

TaskSchema.plugin(autoIncrement.plugin, { model: 'Task', field: 'taskId' });

TaskSchema.pre('remove', function (next) {
  this.model('Swimlane').update(
    { tasks: this._id }, // findcondition
    { $pull: { tasks: this._id } },
    { multi: true },
    next
  );
});

module.exports = mongoose.model('Task', TaskSchema);
