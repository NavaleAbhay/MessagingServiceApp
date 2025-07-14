using MessagingServiceAppAPI.Models;
using System.Collections.Concurrent;

namespace MessagingServiceAppAPI.Services
{
    public class MessageService
    {
        private readonly ConcurrentDictionary<string, List<Message>> _messageQueue = new();

        public void EnqueueMessage(string receiver, Message message)
        {
            _messageQueue.AddOrUpdate(receiver,
                new List<Message> { message },
                (_, existing) => { existing.Add(message); return existing; });
        }

        public List<Message> GetPendingMessages(string receiver)
        {
            if (_messageQueue.TryRemove(receiver, out var messages))
                return messages;
            return new List<Message>();
        }
    }
}
