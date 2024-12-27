const Job = require('../model/JobModel');

// Get All Job Listings
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job listings.', error: err.message });
  }
};

// Get Job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job details.', error: err.message });
  }
};

// Add a New Job
exports.addJob = async (req, res) => {
  try {
    const { title, type, description, requirements, location, applicationDeadline } = req.body;

    if (!title || !type || !description || !location || !applicationDeadline) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const job = new Job({
      title,
      type,
      description,
      requirements,
      location,
      applicationDeadline,
    });

    await job.save();

    res.status(201).json({ message: 'Job added successfully.', job });
  } catch (err) {
    res.status(500).json({ message: 'Error adding job.', error: err.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, description, requirements, location, applicationDeadline } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    job.title = title || job.title;
    job.type = type || job.type;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.location = location || job.location;
    job.applicationDeadline = applicationDeadline || job.applicationDeadline;

    await job.save();

    res.status(200).json({ message: 'Job updated successfully.', job });
  } catch (err) {
    res.status(500).json({ message: 'Error updating job.', error: err.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job.', error: err.message });
  }
};
