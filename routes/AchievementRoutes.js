const express = require('express');
const multer = require('multer');
const {
  getAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
} = require('../controller/AchievementController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.get('/', getAchievements); 
router.post('/', upload.single('image'), addAchievement); 
router.put('/:id', upload.single('image'), updateAchievement); 
router.delete('/:id', deleteAchievement); 


module.exports = router;
