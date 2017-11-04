var Swimlane = require('../models/swimlane.js');

module.exports = {
  postSwimlanes : function(req,res){
    var lane = new Swimlane({
      name: req.body.name,
      color: req.body.color || null,
      tasks: req.body.tasks || null
    });
    lane.save(err=>{
      if(err)
        res.send(err);
      else
        res.json(lane);
    })
  },
  getSwimlanes : function(req,res){
    Swimlane.find((err,lanes)=>{
      if(err)
        res.send(err);
      else
        res.json(lanes);
    })
  },
  getSwimlane : function(req,res){
    Swimlane.findOne({laneId: req.params.swimlane_id}, (err,lane)=>{
      if(err)
        res.send(err);
      else
        res.json(lane);
    })
  },
  putSwimlane : function(req,res){
    Swimlane.findOne({laneId: req.params.swimlane_id}, (err,lane)=>{
      if(err)
        res.send(err);
      else {
        lane.name = req.body.name || lane.name;
        lane.color = req.body.color || lane.color;
        if(req.body.tasks){
          lane.tasks = req.body.tasks;
        }
        lane.save(err=>{
          if(err)
            res.send(err);
          else
            res.json(lane);
        })
      }
    })
  },
  deleteSwimlane : function(req,res){
    Swimlane.findOneAndRemove({laneId: req.params.swimlane_id}, (err,ele)=>{
      ele.remove();
      if(err)
        res.send(err);
      else
        res.json({message: 'deleted lane'});
    })
  }
}
