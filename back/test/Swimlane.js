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

const Swimlane = require('../app/models/swimlane');

describe('Swimlanes', () => {
  after((done) => {
    Swimlane.remove({}, (err) => {
      done();
    });
  });

  describe(' GET swimlanes', () => {
    it('it should GET all the swimlanes', (done) => {
      chai.request(server)
        .get('/api/swimlanes')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe(' POST swimlane', () => {
    it('it should POST a swimlane', (done) => {
      const swimlane = {
        name: 'testlane'
      }
      chai.request(server)
        .post('/api/swimlanes')
        .set('Authorization', 'Bearer ' + token)
        .send(swimlane)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          done();
        });
    });
    it('it should not Post a swimlane', (done) => {
      const swimlane = {
      };
      chai.request(server)
        .post('/api/swimlanes')
        .set('Authorization', 'Bearer ' + token)
        .send(swimlane)
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

  const swimlane = new Swimlane({ name: 'cooltestswimlane'});

  describe(' GET/:id swimlane', () => {
    it('it should GET a swimlane by the given id', (done) => {
      swimlane.save((err, swimlane) => {
        chai.request(server)
          .get('/api/swimlanes/'+ swimlane.laneId)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('laneId').eql(swimlane.laneId);
            done();
          });
      });
    });
  });

  describe(' GET new swimlanes', () => {
    it('it should GET all the swimlanes', (done) => {
      chai.request(server)
        .get('/api/swimlanes')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe(' PUT swimlane', () => {
    it('it should PUT the swimlane', (done) => {
      chai.request(server)
        .put('/api/swimlanes/'+ swimlane.laneId)
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

  describe(' DELETE swimlane', () => {
    it('it should DELETE the swimlane', (done) => {
      chai.request(server)
        .delete('/api/swimlanes/'+ swimlane.laneId)
        .set('Authorization', 'Bearer ' + token)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('deleted lane');
          done();
        });
    });
  });

  describe(' GET 1 less swimlane', () => {
    it('it should GET all the swimlanes, one swimlane less then previous one', (done) => {
      chai.request(server)
        .get('/api/swimlanes')
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
