const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const token = 'Mn1FNv8QhBVsLY5TsGPs3Ov05phOnIwwYbkDjbyndnNbCY3qbJ8SYEcx1k12t7h0aE5nvuFADLchlo6lZYIedtlXiuJRKIur0KqRPvXayLFVU6pwBWmUKoxvqWVy8BA6LlEKLpXIVRLi6Iz8B9aeMqsb3sO7rJPCNylhDgHyO0mRxXUvHhIJjTBwjfdhwo4jvM7XeZLyB1LTfLXFEwmpJXzz0qEOw4IuKCMtDhdR66AtZlp6G2QhblPJR6rtqYGH';

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/solid_disco_test', { useMongoClient: true });
autoIncrement.initialize(db);

const Team = require('../app/models/team');

describe('Teams', () => {
  after((done) => {
    Team.remove({}, (err) => {
      done();
    });
  });

  describe(' GET teams', () => {
    it('it should GET all the teams', (done) => {
      chai.request(server)
        .get('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe(' POST team', () => {
    it('it should POST a team', (done) => {
      const team = {
        name: 'testteam'
      }
      chai.request(server)
        .post('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .send(team)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          done();
        });
    });
    it('it should not Post a team', (done) => {
      const team = {
      };
      chai.request(server)
        .post('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .send(team)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  const team = new Team({ name: 'cooltestteam'});

  describe(' GET/:id team', () => {
    it('it should GET a team by the given id', (done) => {
      team.save((err, team) => {
        chai.request(server)
          .get('/api/teams/'+ team.teamId)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('teamId').eql(team.teamId);
            done();
          });
      });
    });
  });

  describe(' GET new teams', () => {
    it('it should GET all the teams', (done) => {
      chai.request(server)
        .get('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe(' PUT team', () => {
    it('it should PUT the team', (done) => {
      chai.request(server)
        .put('/api/teams/'+ team.teamId)
        .set('Authorization', 'Bearer ' + token)
        .send({ name: 'newtestname'})
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('newtestname');
          done();
        });
    });
  });

  describe(' DELETE team', () => {
    it('it should DELETE the team', (done) => {
      chai.request(server)
        .delete('/api/teams/'+ team.teamId)
        .set('Authorization', 'Bearer ' + token)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('deleted Team');
          done();
        });
    });
  });

  describe(' GET 1 less team', () => {
    it('it should GET all the teams, one team less then previous one', (done) => {
      chai.request(server)
        .get('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });
});
