var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var TaskSchema = new mongoose.Schema({
    taskid: {
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
    }
});

TaskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'taskId'})

TaskSchema.pre('remove'), function(next){
  this.model('Swimlane').update(
    {tasks:this._id},//findcondition
    {$pull: {tasks:this._id}},
    {multi: true},
    next
  );
});

module.exports = mongoose.model('Task', TaskSchema);
