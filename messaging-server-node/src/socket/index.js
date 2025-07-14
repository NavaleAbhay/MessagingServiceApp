const { verifyToken } = require('../helpers/jwt.helper');
const { enqueue, getPending } = require('../services/message.service');

const onlineUsers = new Map(); // username -> socket

const socketHandler = (io) => {
  io.use((socket, next) => {
    const { token } = socket.handshake.auth;
    if (!token) return next(new Error('Token required'));
    try {
      const payload = verifyToken(token);
      socket.username = payload.username;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const username = socket.username;
    onlineUsers.set(username, socket);

    getPending(username).forEach(msg => socket.emit('message', msg));

    socket.on('message', (msg) => {
      // msg.timestamp = new Date().toISOString();
      const receiverSocket = onlineUsers.get(msg.Receiver);
      if (receiverSocket) receiverSocket.emit('message', msg);
      else enqueue(msg.Receiver, msg);
    });

    socket.on('disconnect', () => onlineUsers.delete(username));
  });
};

module.exports = socketHandler;