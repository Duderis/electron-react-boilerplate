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

const Task = require('../app/models/task');

describe('Tasks', () => {
  after((done) => {
    Task.remove({}, (err) => {
      done();
    });
  });

  describe(' GET tasks', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/tasks')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe(' POST task', () => {
    it('it should POST a task', (done) => {
      const task = {
        name: 'testtask'
      }
      chai.request(server)
        .post('/api/tasks')
        .set('Authorization', 'Bearer ' + token)
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          done();
        });
    });
    it('it should not Post a task', (done) => {
      const task = {
      };
      chai.request(server)
        .post('/api/tasks')
        .set('Authorization', 'Bearer ' + token)
        .send(task)
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

  const task = new Task({ name: 'cooltestboard'});

  describe(' GET/:id task', () => {
    it('it should GET a task by the given id', (done) => {
      task.save((err, task) => {
        chai.request(server)
          .get('/api/tasks/'+ task.taskId)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('taskId').eql(task.taskId);
            done();
          });
      });
    });
  });

  describe(' GET new tasks', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/api/tasks')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe(' PUT task', () => {
    it('it should PUT the task', (done) => {
      chai.request(server)
        .put('/api/tasks/'+ task.taskId)
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

  describe(' DELETE task', () => {
    it('it should DELETE the task', (done) => {
      chai.request(server)
        .delete('/api/tasks/'+ task.taskId)
        .set('Authorization', 'Bearer ' + token)
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe(' GET 1 less task', () => {
    it('it should GET all the tasks, one task less then previous one', (done) => {
      chai.request(server)
        .get('/api/tasks')
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
