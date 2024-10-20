const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getUsers } = require('../Controller/userController');

router.get('/get-users', protect, isAdmin ,getUsers); // protect runs first, then isAdmin, then the controller

module.exports = router;
