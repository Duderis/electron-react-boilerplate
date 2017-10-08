var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var TaskSchema = new mongoose.Schema({
    taskid: {
      type: Number,
      required: true
    },
    name: String,
    description: String,
    points: Number,
    duration: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});

TaskSchema.plugin(autoIncrement.plugin, {model: 'Task', field: 'taskId'})

module.exports = mongoose.model('Task', TaskSchema);
