const Application = require('../model/ApplyModel');
const Job = require('../model/JobModel');


exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    const application = new Application({
      jobId,
      name,
      email,
      resume: req.file ? req.file.path : undefined, 
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully.', application });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting application.', error: err.message });
  }
};


exports.getApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

  
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    
    const applications = await Application.find({ jobId });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications.', error: err.message });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting application.', error: err.message });
  }
};
