const express = require('express');
const multer = require('multer');
const {
  applyForJob,
  getApplications,
  deleteApplication,
} = require('../controller/ApplyController');

const router = express.Router();

// Multer setup for file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });






// Routes
router.post('/:jobId', upload.single('resume'), applyForJob); 
router.get('/:jobId', getApplications); 
router.delete('/:id', deleteApplication); 

module.exports = router;
