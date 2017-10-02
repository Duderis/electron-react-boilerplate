var Task = require('../models/task.js');

exports.postTasks = function(req,res){
        res.json({messege: 'called /tasks POST api'})
}

exports.getTasks = function(req,res){
        res.json({messege: 'called /tasks GET api'})
}

exports.getTask = function(req,res){
        res.json({messege: 'called /tasks/:task_id GET api with value:' + req.params.task_id});
}

exports.putTask = function(req,res){
        res.json({messege: 'called /tasks/:task_id PUT api with value:' + req.params.task_id})
}

exports.deleteTask = function(req,res){
        res.json({messege: 'called /tasks/:task_id DELETE api with value:' + req.params.task_id})
}
