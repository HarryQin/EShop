using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EShop.Logging;
using EShop.Purchasing.Domain.Interfaces;
using EShop.Purchasing.Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EShop.Purchasing.Api.Controllers
{
    [Route("Purchase-api/[controller]")]
    [ApiController]

    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseRepository _repository;
        private readonly IEShopLogger<PurchaseController> _logger;
        private readonly IEnumerable<Claim> _currentUserClaims;
        private readonly ClaimsPrincipal _currentUser;
        public PurchaseController(IEShopLogger<PurchaseController> logger, IPurchaseRepository repository)
        {
            _logger = logger;
            _repository = repository;
            //_httpContextAccessor = httpContextAccessor;
            //_currentUser = _httpContextAccessor.CurrentUser();
        }

        [Route("Index")]
        public IActionResult Index()
        {
            return new ContentResult() { Content = "<html><body><h1>EShop.ProductCatalog.Api</h1></body></html>", ContentType = "text/html" };
        }
        // GET api/values
        [Route("GetAll")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<List<Purchase>> GetAll()
        {
            List<Purchase> purchases = new List<Purchase>();
            int customId = 0;
            string identity = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (int.TryParse(identity, out customId) && customId != 0) 
            {
                purchases = _repository.GetPurchases(customId);
            }
            return Ok(purchases);
        }
    }
}
