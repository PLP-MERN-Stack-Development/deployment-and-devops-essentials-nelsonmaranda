const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get recent messages (last 50)
router.get('/', protect, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('sender', 'username _id')
      .lean();

    // Format messages consistently with Socket.io message format
    const formattedMessages = messages.reverse().map(msg => ({
      _id: msg._id,
      sender: {
        _id: msg.sender._id,
        username: msg.sender.username
      },
      content: msg.content,
      timestamp: msg.timestamp
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;

