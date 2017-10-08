var Task = require('../models/task.js');

exports.postTasks = function(req,res){
  var task = new Task({
    name: req.body.name,
    description: req.body.description || null,
    points: req.body.points || null,
    duration: req.body.duration || null,
    createdBy: req.user._id
  });
  task.save(function(err){
    if(err)
      res.send(err);
    else
      res.json({message: 'task: '+task.name+' created'});
  });
}

exports.getTasks = function(req,res){
  Task.find(function(err, tasks){
    if(err)
      res.send(err);
    else
      res.json(tasks);
  });
}

exports.getTask = function(req,res){
  Task.findOne({taskId: req.params.task_id}, (err,task)=>{
    if(err)
      res.send(err);
    else
      res.json(task);
  })
}

exports.putTask = function(req,res){
  Task.findOne({taskId: req.params.task_id}, (err,task)=>{
    if(err)
      res.send(err);
    else {
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.points = req.body.points || task.points;
      task.duration = req.body.duration || task.duration;
      task.save(err=>{
        if(err)
          res.send(err);
        else
          res.json(task);
      });
    }
  });
}

exports.deleteTask = function(req,res){
  Task.findOneAndRemove({taskId: req.params.taskId}, err => {
    if(err)
      res.send(err);
    else
      res.json({ message: 'Task with id '+ req.params.task_id +' was successfully removed.'});
  });
}
