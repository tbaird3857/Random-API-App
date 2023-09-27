const express = require('express');
const supertest = require('supertest');
const Rating = require('../model/rating');
const app = express();
const request = supertest(app);


describe('POST /submitRating', () => {
    it('should respond with a 200 status code and a success message', async () => {
      const response = await request
        .post('/api/submitRating')
        .send({ rating: 4 }); // Send a sample rating in the request body
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Rating saved successfully' });
    });
  
    it('should handle errors and respond with a 500 status code', async () => {
      // Mock Rating.save to simulate an error
      Rating.prototype.save = jest.fn(() => {
        throw new Error('Test error');
      });
  
      const response = await request
        .post('/api/submitRating')
        .send({ rating: 3 });
  
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to save rating' });
    });
  });
  
  // Could write similar tests for the GET /ratings route handler.
  