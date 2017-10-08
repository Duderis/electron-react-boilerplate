var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var TeamSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true
  },
  name: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }]
})

TeamSchema.plugin(autoIncrement.plugin, {model: 'Team', field: 'teamId'})

module.exports = mongoose.model('Team', TeamSchema);
