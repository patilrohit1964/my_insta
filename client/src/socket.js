// src/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("http://localhost:4050", {
    query: { userId },
    transports: ["websocket"],
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
