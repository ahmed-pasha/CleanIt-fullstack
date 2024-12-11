const Payment = require('../models/Payment');
const Gig = require('../models/Gig');

exports.createPayment = async (req, res) => {
  try {
    const { gigId, ecoHeroId, amount } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });

    const payment = await Payment.create({
      customerId: req.user.id,
      ecoHeroId,
      gigId,
      amount,
      status: 'pending',
    });

    res.status(201).json({ message: 'Payment initiated', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    // const userId = req.user.id;

    const payment = await Payment.find({
      customerId: req.user.id
    });

    res.status(201).json({ message: 'Payment data', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = 'completed';
    payment.paymentDate = new Date();
    await payment.save();

    res.status(200).json({ message: 'Payment completed', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
