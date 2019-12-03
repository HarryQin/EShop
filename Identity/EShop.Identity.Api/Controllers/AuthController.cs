using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using EShop.Identity.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using System.Configuration;
using EShop.Logging;
using Microsoft.Extensions.Configuration;
using EShop.Identity.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace EShop.Identity.Api.Controller
{
    [Route("Identity-api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IEShopLogger<AuthController> _logger;
        public readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IEnumerable<Claim> _currentUserClaims;
        private readonly ClaimsPrincipal _currentUser;

        public IConfiguration Configuration { get; }
        public AuthController(IConfiguration configuration,  IEShopLogger<AuthController> logger, ICustomerRepository customerRepository) 
        {
            Configuration = configuration;
            _logger = logger;
            _customerRepository = customerRepository;
            //_httpContextAccessor = httpContextAccessor;
            //_currentUser = _httpContextAccessor.CurrentUser();
        }
        private List<Customer> _users = new List<Customer>
        {
            new Customer { Id = 1, Name = "Test", Email="test@test.com", Password = "test" }
        };
        [Route("Index")]
        public IActionResult Index()
        {
            var customer = _customerRepository.GetCustomerbyEmail("Test1@test.com");
            return new ContentResult() { Content = "<html><body><h1>EShop.Identity.Api</h1></body></html>", ContentType = "text/html" };
        }
        [Route("authenticate")]
        [HttpPost]
        public IActionResult Authenticate(AuthModel model)
        {
            var customer = Authenticate(model.Email, model.Password);

            if (customer == null)
                return BadRequest(new { message = "Email or password is incorrect!" });

            return Ok(customer);
        }
        [Authorize]
        [Route("test")]
        public IActionResult Test()
        {
            return new ContentResult() { Content = "<html><body><h1>EShop.Identity.Api</h1></body></html>", ContentType = "text/html" };
        }
        public Customer Authenticate(string email, string password)
        {
            try {
                var customer = _customerRepository.GetCustomerbyEmail(email.ToLower());
                if (customer == null)
                {
                    return null;
                }
                if (customer.Password != password)
                {
                    return null;
                }
                else
                {
                    // authentication successful so generate jwt token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("Secret"));
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Email, customer.Email),
                            new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
                            new Claim(ClaimTypes.Role, "Customer")
                        }),
                        Expires = DateTime.UtcNow.AddHours(3),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    customer.Token = tokenHandler.WriteToken(token);
                    customer.Password = "";
                    return customer;
                }
            }
            catch (Exception ex) 
            {
                return null;
            }
        }
    }
}