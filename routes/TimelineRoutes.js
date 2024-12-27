const express = require('express');
const { getTimelines, createTimeline } = require('../controller/TimelineController');
const router = express.Router();

router.post('/', createTimeline); 
router.get('/', getTimelines); 

module.exports = router;
