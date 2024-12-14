const Turf = require('../Models/Turf');
const { uploadToS3 } = require('../Services/aws');
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller to add a new turf
const addTurf = async (req, res) => {
  console.log('Request body:', req.body); // Check what is being sent
  try {
    const { name, description, amenities, pricePerHour, pricePerMonth, slots,userId,location } = req.body;

    const imageFiles = req.files['images'] || [];
    const videoFiles = req.files['videos'] || [];

    // Upload images and videos to S3
    const imageUploadPromises = imageFiles.map(uploadToS3);
    const videoUploadPromises = videoFiles.map(uploadToS3);

    const imageUploadResults = await Promise.all(imageUploadPromises);
    const videoUploadResults = await Promise.all(videoUploadPromises);

    const imageUrls = imageUploadResults.map((result) => result.Location);
    const videoUrls = videoUploadResults.map((result) => result.Location);

    // Create new Turf entry
    const newTurf = new Turf({
      name,
      description,
      amenities: amenities.split(','),
      pricePerHour,
      pricePerMonth,
      userId,
      location,
      slots: JSON.parse(slots),
      images: imageUrls,
      videos: videoUrls,
    });

    await newTurf.save();
    res.status(201).json(newTurf);
  } catch (error) {
    console.error('Error adding turf:', error);
    res.status(500).json({ error: 'Failed to add turf' });
  }
};

const getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find(); // Fetch all turfs
    res.status(200).json(turfs);
  } catch (error) {
    console.error('Error fetching turfs:', error);
    res.status(500).json({ error: 'Failed to fetch turfs' });
  }
};


const getTurfById = async (req, res) => {
  try {
    const { id } = req.params; // Get the turf ID from the request parameters
    const turf = await Turf.findById(id); // Fetch the turf by ID

    if (!turf) {
      return res.status(404).json({ error: 'Turf not found' }); // Handle case where turf is not found
    }

    res.status(200).json(turf); // Return the turf details
  } catch (error) {
    console.error('Error fetching turf by ID:', error);
    res.status(500).json({ error: 'Failed to fetch turf by ID' });
  }
};


const getTurfByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user (owner) ID from the request parameters
    const turfs = await Turf.find({ userId: userId }); // Fetch turfs by owner ID
      console.log("userid:" ,userId)
    if (turfs.length === 0) {
      return res.status(404).json({ error: 'No turfs found for this owner' }); // Handle case where no turfs are found
    }

    res.status(200).json(turfs); // Return the list of turfs
  } catch (error) {
    console.error('Error fetching turfs by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch turfs by user ID' });
  }
};


module.exports = {
  addTurf,
  upload,
  getTurfs,
  getTurfByUserId,
  getTurfById
};
