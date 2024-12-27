const Team = require('../model/Teamprofile');


// Fetch all team members
exports.getTeamMembers = async (req, res) => {
    try {
        const team = await Team.find();
        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addTeamMember = async (req, res) => {
    try {
      const { name, role, expertise, videoUrl } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required.' });
      }
  
      const teamMember = new Team({
        name,
        role,
        expertise: expertise ? expertise.split(',') : [],
        videoUrl,
        image: req.file.path, 
      });
  
      await teamMember.save();
  
      res.status(201).json({ message: 'Team member added successfully.', teamMember });
    } catch (error) {
      res.status(500).json({ message: 'Error adding team member.', error: error.message });
    }
  };


  exports.updateTeamMember = async (req, res) => {
    try {
      const { id } = req.params; // Team member ID
      const { name, role, expertise, videoUrl } = req.body;
  
      // Find the team member by ID
      const teamMember = await Team.findById(id);
      if (!teamMember) {
        return res.status(404).json({ message: 'Team member not found.' });
      }
  
      // Update fields
      teamMember.name = name || teamMember.name;
      teamMember.role = role || teamMember.role;
      teamMember.expertise = expertise ? expertise.split(',') : teamMember.expertise;
      teamMember.videoUrl = videoUrl || teamMember.videoUrl;
  
      // Update image if a new file is uploaded
      if (req.file) {
        teamMember.image = req.file.path;
      }
  
      // Save the updated team member
      await teamMember.save();
  
      res.status(200).json({ message: 'Team member updated successfully.', teamMember });
    } catch (error) {
      res.status(500).json({ message: 'Error updating team member.', error: error.message });
    }
  };

  

  exports.deleteTeamMember = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the team member by ID
      const teamMember = await Team.findByIdAndDelete(id);
      if (!teamMember) {
        return res.status(404).json({ message: 'Team member not found.' });
      }
  
      res.status(200).json({ message: 'Team member deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting team member.', error: error.message });
    }
  };
  