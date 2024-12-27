const express = require('express');
const {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
} = require('../controller/JobController');

const router = express.Router();

// Routes
router.get('/', getJobs); 
router.get('/:id', getJobById);
router.post('/', addJob); 
router.put('/:id', updateJob); 
router.delete('/:id', deleteJob); 

module.exports = router;
