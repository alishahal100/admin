// controllers/slotController.js
const Slot = require('../Models/Slot');

// Add a new slot
exports.addSlot = async (req, res) => {
  try {
    const { turfId, startTime, endTime } = req.body;
    console.log(req.body);
    
    const slot = new Slot({ turfId, startTime, endTime });
    await slot.save();
    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create slot' });
  }
};

// Update slot
exports.updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, status } = req.body;
    const updatedSlot = await Slot.findByIdAndUpdate(
      id,
      { startTime, endTime, status },
      { new: true }
    );
    if (!updatedSlot) {
      return res.status(404).json({ error: 'Slot not found' });
    }
    res.status(200).json({ message: 'Slot updated successfully', updatedSlot });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slot' });
  }
};

// Get all slots for a turf
exports.getSlotsByTurfId = async (req, res) => {
  try {
    const { turfId } = req.params;
    const slots = await Slot.find({ turfId });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
};
