const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

const token = '0nWiCLEHlWKjuTFpHY2DAxO6kBkbgxZjQY8DSYp2SoKlSwFaxgEheUf5I448quDov5sm0fdNuE61fIxCgeNaitCxX6o63bqib9O4VgQEqSQJPF9Cs7GqXXjX1McDrEf2zDsZE02PxhqQAZWUZDnw8diW4TXc2x9bBylEPEpxbbjSEHuRPTvamlXEXr72UYxBKbCB105JLrOpAfkGCPWaWTcJ7rmaihLYs9Hyqhc2bki4uOrcpXkK6eRgTVFFlGwd';

const db = mongoose.connect('mongodb://localhost:27017/solid_disco', { useMongoClient: true });
autoIncrement.initialize(db);

const Board = require('../app/models/board');

describe('Boards', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });
});

describe(' GET boards', () => {
  it('it should GET all the boards', (done) => {
    chai.request(server)
      .get('/api/boards')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});

describe(' POST board', () => {
  if('it should POST a board' (done) => {
    const board = {

    }
  })
})
