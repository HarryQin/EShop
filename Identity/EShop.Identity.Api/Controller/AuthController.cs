using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Identity.Api.Controller
{
    [Route("Identity-api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        [Route("Index")]
        public IActionResult Index()
        {
            return new ContentResult() { Content = "<html><body><h1>EShop.Identity.Api</h1></body></html>", ContentType = "text/html" };
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