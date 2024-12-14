// routes/slotRoutes.js
const express = require('express');
const { addSlot, updateSlot, getSlotsByTurfId } = require('../Controller/slotController');
const router = express.Router();

// Add slot
router.post('/add', addSlot);

// Update slot
router.put('/:id', updateSlot);

// View slots by Turf ID
router.get('/:turfId', getSlotsByTurfId);

module.exports = router;
