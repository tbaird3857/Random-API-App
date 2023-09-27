const express = require('express');
const Rating = require('../model/rating'); 

const router = express.Router();

// Define an async route handler
router.post('/submitRating', async (req, res) => {
  try {
    // Get the rating value from the request body
    const { rating } = req.body;

    // Create a new Rating instance with the received rating value
    const newRating = new Rating({ rating });

    await newRating.save();
    console.log("Rating saved successfully");
    res.status(200).json({ message: "Rating saved successfully" });
  } catch (err) {
    console.error("Error saving rating:", err);
    res.status(500).json({ error: "Failed to save rating" });
  }
});

function calculateHistogram(ratings) {
  const histogram = {
    1: 0, 
    2: 0, 
    3: 0, 
    4: 0, 
    5: 0, 
  };

  ratings.forEach((rating) => {
    if (rating >= 1 && rating <= 5) {
      histogram[rating]++;
    }
  });

  return histogram;
}

// Define another async route handler for retrieving ratings
router.get('/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find({});
    console.log("Ratings retrieved successfully");
    
    // Calculate the histogram and send it as a response
    const histogramData = calculateHistogram(ratings);
    res.status(200).json(histogramData);
  } catch (err) {
    console.error("Error retrieving ratings:", err);
    res.status(500).json({ error: "Failed to retrieve ratings" });
  }
});

module.exports = router;
