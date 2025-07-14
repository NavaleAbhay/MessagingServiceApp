const messageQueue = new Map(); // receiver -> [messages]

const enqueue = (receiver, message) => {
  const list = messageQueue.get(receiver) || [];
  list.push(message);
  messageQueue.set(receiver, list);
};

const getPending = (receiver) => {  
  const list = messageQueue.get(receiver) || [];
 // messageQueue.delete(receiver);
  return list;
};

module.exports = { enqueue, getPending };