const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;