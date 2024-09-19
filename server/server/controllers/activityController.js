const Activity = require('../models/ActivitySchema');

// Create a new activity
exports.createActivity = async (req, res) => {
  const { name, description, location } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const newActivity = new Activity({
      name,
      description,
      location,
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update activity by ID 
exports.updateActivity = async (req, res) => {
  const { name, description, location } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { name, description, location },
      { new: true, runValidators: true }
    );

    if (!updatedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete activity
exports.deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) return res.status(404).json({ message: 'Activity not found' });
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
