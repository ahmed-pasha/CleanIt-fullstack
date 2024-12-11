const express = require('express');
const { createGig, getGigs, bidOnGig, getGigById, assignGigToUser, getAssignedGigs, getGigByUser } = require('../controllers/gigController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createGig);
router.get('/', protect, getGigs);
router.get('/user', protect, getGigByUser);
router.get('/:id',  getGigById);
router.post('/:gigId/addgigtouser', protect, assignGigToUser);
router.get('/:userId/getUserGigs', getAssignedGigs)

router.post('/:id/bid', protect, bidOnGig);

module.exports = router;
