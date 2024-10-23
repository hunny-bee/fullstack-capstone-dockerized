const Property = require('../models/PropertySchema');
const upload = require('../middleware/uploadMiddleware');

exports.createProperty = [
  upload.array('images', 5), // Allow up to 5 images
  async (req, res) => {
    try {
      const { title, description, address, city, country, pricePerNight, availableDates, amenities, activities } = req.body;
      const images = req.files.map(file => file.path);

      const property = new Property({
        title,
        description,
        address,
        city,
        country,
        pricePerNight: Number(pricePerNight),
        images,
        host: req.user.userId,
        availableDates: availableDates ? JSON.parse(availableDates) : [],
        amenities: amenities ? JSON.parse(amenities) : [],
        activities: activities ? JSON.parse(activities) : []
      });

      await property.save();
      res.status(201).json({ message: 'Property created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
];

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

exports.getPropertiesByHost = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.params.hostId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};