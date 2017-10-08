var Swimlane = require('../models/swimlane.js');
import {arrUniq} from '../utils';

exports.postSwimlanes = function(req,res){
  var lane = new Swimlane({
    name: req.body.name,
    color: req.body.color || null,
    tasks: []
  });
  lane.save(err=>{
    if(err)
      res.send(err);
    else
      res.json(lane);
  })
}

exports.getSwimlanes = function(req,res){
  Swimlane.find((err,lanes)=>{
    if(err)
      res.send(err);
    else
      res.json(lanes);
  })
}

exports.getSwimlane = function(req,res){
  Swimlane.findOne({laneId: req.params.swimlane_id}, (err,lane)=>{
    if(err)
      res.send(err);
    else
      res.json(lane);
  })
}

exports.putSwimlane = function(req,res){
  Swimlane.findOne({laneId: req.params.swimlane_id}, (err,lane)=>{
    if(err)
      res.send(err);
    else {
      lane.name = req.body.name || lane.name;
      lane.color = req.body.color || lane.color;
      if(req.body.tasks){
        lane.tasks = arrUniq(lane.tasks.concat(req.body.tasks));
      }
      lane.save(err=>{
        if(err)
          res.send(err);
        else
          res.json(lane);
      })
    }
  })
}

exports.deleteSwimlane = function(req,res){
  Swimlane.findOneAndRemove({laneId: req.params.swimlane_id}, err=>{
    if(err)
      res.send(err);
    else
      res.json({message: 'deleted lane'});
  })
}
