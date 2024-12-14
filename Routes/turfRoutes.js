const express = require('express');
const { addTurf, upload,getTurfs ,getTurfById,getTurfByUserId} = require('../Controller/turfController');

const router = express.Router();

// POST route for adding new turf
router.post('/add-turf', upload.fields([{ name: 'images' }, { name: 'videos' }]), addTurf);
router.get('/get-turfs',getTurfs);
router.get('/get-turf/:id', getTurfById); 
router.get('/turfs/owner/:userId', getTurfByUserId); 
module.exports = router;
