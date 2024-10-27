
import properties from '@/data/property'; 

export default function handler(req, res) {
  const { location } = req.query;

  const filteredProperties = properties.filter(property =>
    property.location.toLowerCase().includes(location.toLowerCase())
  );

  res.status(200).json(filteredProperties);
}
