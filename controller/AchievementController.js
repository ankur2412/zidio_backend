const Achievement = require('../model/AchievementModel');

// Get All Achievements
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching achievements.', error: err.message });
  }
};

// Add a New Achievement
exports.addAchievement = async (req, res) => {
  try {
    const { heading, text } = req.body;

    if (!heading || !text) {
      return res.status(400).json({ message: 'Heading and text are required.' });
    }

    const achievement = new Achievement({
      heading,
      text,
      image: req.file ? req.file.path : undefined, 
    });

    await achievement.save();

    res.status(201).json({ message: 'Achievement added successfully.', achievement });
  } catch (err) {
    res.status(500).json({ message: 'Error adding achievement.', error: err.message });
  }
};

// Update an Achievement
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, text } = req.body;

    const achievement = await Achievement.findById(id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found.' });
    }

    achievement.heading = heading || achievement.heading;
    achievement.text = text || achievement.text;

    if (req.file) {
      achievement.image = req.file.path; // Update image if uploaded
    }

    await achievement.save();

    res.status(200).json({ message: 'Achievement updated successfully.', achievement });
  } catch (err) {
    res.status(500).json({ message: 'Error updating achievement.', error: err.message });
  }
};

// Delete an Achievement
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found.' });
    }

    res.status(200).json({ message: 'Achievement deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting achievement.', error: err.message });
  }
};
