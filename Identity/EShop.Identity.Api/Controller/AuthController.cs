using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using EShop.Identity.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using System.Configuration;
using EShop.Logging;
using Microsoft.Extensions.Configuration;

namespace EShop.Identity.Api.Controller
{
    [Route("Identity-api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        public AuthController(IConfiguration configuration, IEShopLogger<AuthController> logger) 
        {
            Configuration = configuration;
        }
        private List<Customer> _users = new List<Customer>
        {
            new Customer { Id = 1, Name = "Test", Email="test@test.com", Password = "test" }
        };
        [Route("Index")]
        public IActionResult Index()
        {
            return new ContentResult() { Content = "<html><body><h1>EShop.Identity.Api</h1></body></html>", ContentType = "text/html" };
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthModel model)
        {
            var customer = Authenticate(model.Email, model.Password);

            if (customer == null)
                return BadRequest(new { message = "Email or password is incorrect!" });

            return Ok(customer);
        }
        public Customer Authenticate(string email, string password)
        {
            var user = _users.SingleOrDefault(x => x.Email == email && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("Secure"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }
        [HttpGet, Route("logout")]
        public async Task LogOut()
        {

            if (HttpContext.User != null && HttpContext.User.Identity.IsAuthenticated)
            {
            }
        }
    }
}