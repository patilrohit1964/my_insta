const Conversation = require("../models/conversation.model");
const Messages = require("../models/message.model");

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
    const newMessage = await Messages.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);
    // implement socket for real time

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {}
};

const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation)
      return res.status(404).json({ success: false, message: [] });
    return res
      .status(200)
      .json({ success: true, message: conversation?.messages });
  } catch (error) {}
};

module.exports = { sendMessage, getMessages };
