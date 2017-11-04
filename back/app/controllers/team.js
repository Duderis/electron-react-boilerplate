const Team = require('../models/team.js');

module.exports = {
  postTeams : function (req, res) {
    //console.log(req.body);
    const team = new Team({
      name: req.body.name,
      users: req.body.users || [],
      boards: req.body.boards || []
    });
    team.save(err => {
      if (err) { res.send(err); } else { res.json(team); }
    });
  },
  getTeams : function (req, res) {
    Team.find((err, teams) => {
      if (err) { res.send(err); } else { res.json(teams); }
    });
  },
  getTeam : function (req, res) {
    Team.findOne({ teamId: req.params.team_id }, (err, team) => {
      if (err) { res.send(err); } else { res.json(team); }
    });
  },
  putTeam : function (req, res) {
    Team.findOne({ teamId: req.params.team_id }, (err, team) => {
      if (err) { res.send(err); } else {
        team.name = req.body.name || team.name;
        if (req.body.users) {
          team.users = req.body.users;
        }
        if (req.body.boards) {
          team.boards = req.body.boards;
        }
        team.save(err => {
          if (err) { res.send(err); } else { res.json(team); }
        });
      }
    });
  },
  deleteTeam : function (req, res) {
    Team.findOneAndRemove({ teamId: req.params.team_id }, err => {
      if (err) { res.send(err); } else { res.json({ message: 'deleted Team' }); }
    });
  }
}
