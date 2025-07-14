using MessagingServiceAppAPI.Models;
using MessagingServiceAppAPI.Services;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace MessagingServiceAppAPI.Middleware
{
    public class ChatWebSocketMiddleware
    {
        private readonly RequestDelegate _next;

        public ChatWebSocketMiddleware(RequestDelegate next) => _next = next;

        public async Task Invoke(HttpContext context, UserConnectionManager userManager, MessageService messageService)
        {
            if (context.Request.Path == "/ws" && context.WebSockets.IsWebSocketRequest)
            {
                var token = context.Request.Query["access_token"].ToString();
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                var username = jwt.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;

                var socket = await context.WebSockets.AcceptWebSocketAsync();
                userManager.Add(username, socket);

                // Send pending messages
                var pending = messageService.GetPendingMessages(username);
                foreach (var msg in pending)
                    await SendMessage(socket, msg);

                // Listen for new messages
                var buffer = new byte[1024 * 4];
                while (socket.State == WebSocketState.Open)
                {
                    var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.Count == 0)
                        continue;
                    var msgJson = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    if (string.IsNullOrWhiteSpace(msgJson))
                        continue;
                    //var msg = JsonSerializer.Deserialize<Message>(msgJson);
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    var msg = JsonSerializer.Deserialize<Message>(msgJson, options);

                    msg.Timestamp = DateTime.UtcNow;

                    if (!string.IsNullOrEmpty(msg.Receiver))
                    {
                        var receiverSocket = userManager.GetSocket(msg.Receiver);
                        if (receiverSocket != null && receiverSocket.State == WebSocketState.Open)
                        {
                            await SendMessage(receiverSocket, msg);
                        }
                        else
                        {
                            messageService.EnqueueMessage(msg.Receiver, msg);
                        }
                    }
                }

                userManager.Remove(username);
            }
            else
            {
                await _next(context);
            }
        }

        private async Task SendMessage(WebSocket socket, Message message)
        {
            var json = JsonSerializer.Serialize(message);
            var buffer = Encoding.UTF8.GetBytes(json);
            await socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
