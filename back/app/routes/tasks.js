var express = require('express');
var router = express.Router();
var taskController = require('../controllers/task.js');

//TASKS-----------------------
router.route('/tasks')

    .post(taskController.postTasks)
    .get(taskController.getTasks);

router.route('/tasks/:task_id')

    .get(taskController.getTask)
    .put(taskController.putTask)
    .delete(taskController.deleteTask);
//END_TASKS-------------------

module.exports = router;
