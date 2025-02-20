const Conversation = require("../models/conversation.model");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.receiverId;
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    
  } catch (error) {}
};
