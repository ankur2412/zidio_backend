const express = require('express');
const { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = require('../controller/TeamController');
const router = express.Router();


const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get('/', getTeamMembers); 
router.post('/', upload.single('image'), addTeamMember); 
router.put('/:id', upload.single('image'), updateTeamMember);
router.delete('/:id', deleteTeamMember);


module.exports = router;
