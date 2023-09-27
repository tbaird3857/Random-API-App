const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 }
});

const Rating = mongoose.model('rating', ratingSchema, 'rating');

module.exports = Rating;
