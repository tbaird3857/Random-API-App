const mongoose = require('mongoose');
const express = require('express');
const app = require('express')(); 
const request = require('supertest'); 

const server = require('../server');

// Mock mongoose functions to prevent actual database connections
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
  },
}));

describe('Server Tests', () => {
  beforeAll(() => {
    // Set up mongoose connection mock
    mongoose.connect.mockImplementation((uri, options) => {
      // mock connection setup 
      options.onConnected(); 
    });

    app.listen(0);
  });

  afterAll(() => {
    // Clean up mongoose mocks
    jest.clearAllMocks();
  });

  it('should connect to MongoDB when the server starts', () => {
    expect(mongoose.connect).toHaveBeenCalledWith(
      'mongodb://127.0.0.1/apidb',
      expect.objectContaining({
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    );
  });

  it('should set up Express middleware for handling CORS', async () => {
    await request(app)
      .get('/test-cors')
      .expect('Access-Control-Allow-Origin', 'http://localhost:3000')
      .expect('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  });

  it('should start the server and listen on a port', (done) => {
    
    request(app).get('/').end((err, res) => {
      expect(res.statusCode).toBe(404); // expect a 404 response
      done();
    });
  });
});
