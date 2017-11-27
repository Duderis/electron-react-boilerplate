const Task = require('../models/task.js');

module.exports = {
  postTasks : function (req, res) {
    const task = new Task({
      name: req.body.name,
      description: req.body.description || null,
      points: req.body.points || null,
      duration: req.body.duration || null,
      createdBy: req.user._id,
      parentBoard: req.body.parentBoard || null,
      parentSwimlane: req.body.parentSwimlane || null
    });
    task.save((err) => {
      if (err) { res.send(err); } else { res.json(task); }
    });
  },
  getTasks : function (req, res) {
    Task.find((err, tasks) => {
      if (err) { res.send(err); } else { res.json(tasks); }
    });
  },
  getTask : function (req, res) {
    Task.findOne({ taskId: req.params.task_id }, (err, task) => {
      if (err) { res.send(err); } else { res.json(task); }
    });
  },
  putTask : function (req, res) {
    Task.findOne({ taskId: req.params.task_id }, (err, task) => {
      if (err) { res.send(err); } else {
        task.name = req.body.name || task.name;
        task.description = req.body.description || task.description;
        task.points = req.body.points || task.points;
        task.duration = req.body.duration || task.duration;
        task.parentBoard = req.body.parentBoard || task.parentBoard;
        task.parentSwimlane = req.body.parentSwimlane || task.parentSwimlane;
        task.save((err) => {
          if (err) { res.send(err); } else { res.json(task); }
        });
      }
    });
  },
  deleteTask : function (req, res) {
    Task.findOneAndRemove({ taskId: req.params.task_id }, (err, ele) => {
      ele.remove();
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'task deleted'}); }
    });
  }
}
