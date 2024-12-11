const express = require('express');
const { createGroup, addMember } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createGroup);
router.post('/add-member', protect, addMember);

module.exports = router;
