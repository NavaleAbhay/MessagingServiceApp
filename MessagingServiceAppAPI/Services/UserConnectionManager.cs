using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace MessagingServiceAppAPI.Services
{
    public class UserConnectionManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> _connections = new();

        public void Add(string username, WebSocket socket) => _connections[username] = socket;
        public void Remove(string username) => _connections.TryRemove(username, out _);
        public WebSocket GetSocket(string username) => _connections.GetValueOrDefault(username);
        public bool IsOnline(string username) => _connections.ContainsKey(username);
    }
}
