using MessagingServiceAppAPI.Models;
using MessagingServiceAppAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MessagingServiceAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IConfiguration _config;

        public AuthController(AuthService authService, IConfiguration config)
        {
            _authService = authService;
            _config = config;
        }


        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            bool status = _authService.Register(user.Username, user.Password);
        return BuildResponse(
            status: status,
            data: null,
            message: status ? "Registered" : "User already exists");
        }

        [HttpPost("verify")]
        public IActionResult Verify(VerifyRequest data)
        {
            bool status = _authService.Verify((string)data.Username, (string)data.Otp);
        return BuildResponse(
            status: status,
            data: null,
            message: status ? "Verified" : "UnVerified");
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            bool credentialsOk = _authService.ValidateLogin(user.Username,
                                                             user.Password);

            if (!credentialsOk)
                return BuildResponse(false, null, "Invalid username or password");

            string token = GenerateJwtToken(user.Username);
            return BuildResponse(true, new { token }, "Login successful");
        }

        private string GenerateJwtToken(string username)
        {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(claims: new[] { new Claim(ClaimTypes.Name, username) }, expires: DateTime.UtcNow.AddHours(1), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private IActionResult BuildResponse(bool status, object? data, string message)
        {
            var payload = new
            {
                status,
                data,
                message
            };
            return Ok(payload);
        }
    }
}
