const express = require('express');
const { getReviews, addReview } = require('../controller/ClientReviewController');
const router = express.Router();

router.get('/', getReviews); // Fetch all reviews
router.post('/', addReview); // Add a new review

module.exports = router;
