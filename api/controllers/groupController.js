const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = await Group.create({
      name,
      createdBy: req.user.id,
      members,
    });

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.members.push(userId);
    await group.save();

    res.status(200).json({ message: 'Member added successfully', group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
