const Conversation = require("../models/conversation.model");
const Messages = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.receiverId;
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
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
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log(receiverSocketId, "socket id of receiver id");
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    console.log(receiverId, "receiver id");
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation)
      return res.status(404).json({ success: false, message: [] });
    return res
      .status(200)
      .json({ success: true, message: conversation?.messages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, getMessages };
