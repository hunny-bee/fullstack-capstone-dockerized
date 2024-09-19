const Property = require('../models/property');

exports.createProperty = async (req, res) => {
  try {
    const { title, description, address, city, country, pricePerNight, availableDates, images, amenities, activities } = req.body;

    const property = new Property({
      title,
      description,
      address,
      city,
      country,
      pricePerNight,
      availableDates,
      images,
      amenities,
      activities,
      host: req.user.userId
    });

    await property.save();
    res.status(201).json({ message: 'Property created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all properties (with filters)
exports.getAllProperties = async (req, res) => {
  try {
    const { city, country, minPrice, maxPrice, activity } = req.query;
    let query = {};

    if (city) query.city = city;
    if (country) query.country = country;
    if (minPrice || maxPrice) query.pricePerNight = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (activity) query.activities = activity;

    const properties = await Property.find(query).populate('host', 'name');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const updates = req.body;
    const property = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
