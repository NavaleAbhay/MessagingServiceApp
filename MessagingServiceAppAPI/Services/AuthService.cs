using MessagingServiceAppAPI.Models;
using System.Collections.Concurrent;

namespace MessagingServiceAppAPI.Services
{
    public class AuthService
    {
        private readonly ConcurrentDictionary<string, User> _users = new();

        public bool Register(string username, string password)
            => _users.TryAdd(username, new User { Username = username, Password = password });

        public bool Verify(string username, string otp)
        {
            if (_users.TryGetValue(username, out var user) && otp == "123456")
            {
                user.IsVerified = true;
                return true;
            }
            return false;
        }

        public bool ValidateLogin(string username, string password)
            => _users.TryGetValue(username, out var user)
               && user.Password == password && user.IsVerified; 
    }
}
