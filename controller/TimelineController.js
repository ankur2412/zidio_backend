const Timeline = require('../model/Timeline');


// Create a new timeline entry
exports.createTimeline = async (req, res) => {
    try {
        const newTimeline = new Timeline(req.body);
        await newTimeline.save();
        res.status(201).json(newTimeline);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fetch all timelines
exports.getTimelines = async (req, res) => {
    try {
        const timelines = await Timeline.find();
        res.status(200).json(timelines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


