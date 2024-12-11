const express = require('express');
const { createPayment, completePayment, getPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createPayment);
router.get('/', protect, getPayment);
router.patch('/:paymentId', protect, completePayment);


module.exports = router;
