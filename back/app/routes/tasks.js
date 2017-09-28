var express = require('express');
var router = express.Router();

//TASKS-----------------------
router.route('/tasks')

    .post(function(req,res){
        res.json({messege: 'called /tasks POST api'})
    })
    .get(function(req,res){
        res.json({messege: 'called /tasks GET api'})
    });

router.route('/tasks/:task_id')

    .get(function(req,res){
        res.json({messege: 'called /tasks/:task_id GET api with value:' + req.params.task_id});
    })
    .put(function(req,res){
        res.json({messege: 'called /tasks/:task_id PUT api with value:' + req.params.task_id})
    })
    .delete(function(req,res){
        res.json({messege: 'called /tasks/:task_id DELETE api with value:' + req.params.task_id})
    });
//END_TASKS-------------------

module.exports = router;
