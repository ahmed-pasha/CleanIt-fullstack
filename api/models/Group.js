const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedGigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig' },
  contribution: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: Number,
      status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', groupSchema);
