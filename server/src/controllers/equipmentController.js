import Equipment from '../models/Equipment.js';

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public
const getEquipment = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const equipment = await Equipment.find({ ...keyword }).populate('owner', 'name phone');
  res.json(equipment);
};

// @desc    Get nearby equipment
// @route   GET /api/equipment/nearby
// @access  Public
const getNearbyEquipment = async (req, res) => {
  const { lng, lat, distance = 50 } = req.query; // distance in km

  if (!lng || !lat) {
    return res.status(400).json({ message: 'Please provide longitude and latitude' });
  }

  // Convert distance to radians (Earth radius is approx 6378.1 km)
  const radius = distance / 6378.1;

  const equipment = await Equipment.find({
    location: {
      $geoWithin: {
        $centerSphere: [[Number(lng), Number(lat)], radius],
      },
    },
  }).populate('owner', 'name phone');

  res.json(equipment);
};

// @desc    Create an equipment listing
// @route   POST /api/equipment
// @access  Private/Owner
const createEquipment = async (req, res) => {
  const { name, type, description, ratePerHour, ratePerDay, location } = req.body;

  const equipment = new Equipment({
    name,
    type,
    description,
    ratePerHour,
    ratePerDay,
    location,
    owner: req.user._id,
  });

  const createdEquipment = await equipment.save();
  res.status(201).json(createdEquipment);
};

// @desc    Update an equipment listing
// @route   PUT /api/equipment/:id
// @access  Private/Owner
const updateEquipment = async (req, res) => {
  const { name, type, description, ratePerHour, ratePerDay, location, availabilityStatus } = req.body;

  const equipment = await Equipment.findById(req.params.id);

  if (equipment) {
    // Check if the user is the owner
    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this equipment' });
    }

    equipment.name = name || equipment.name;
    equipment.type = type || equipment.type;
    equipment.description = description || equipment.description;
    equipment.ratePerHour = ratePerHour || equipment.ratePerHour;
    equipment.ratePerDay = ratePerDay || equipment.ratePerDay;
    equipment.location = location || equipment.location;
    
    if (availabilityStatus !== undefined) {
       equipment.availabilityStatus = availabilityStatus;
    }

    const updatedEquipment = await equipment.save();
    res.json(updatedEquipment);
  } else {
    res.status(404).json({ message: 'Equipment not found' });
  }
};

export { getEquipment, getNearbyEquipment, createEquipment, updateEquipment };
