using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EShop.ProductCatalog.Domain.Interfaces;
using EShop.Logging;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using EShop.ProductCatalog.Domain.Models;

namespace EShop.ProductCatalog.Api.Controllers
{
    [Authorize(Policy = "ApiReader")]
    [Route("Catalog-api/[controller]")]
    [ApiController]
    public class ProductCatalogController : ControllerBase
    {
        private readonly IProductCatalogRepository _repository;
        private readonly IEShopLogger<ProductCatalogController> _logger;
        private readonly IEnumerable<Claim> _currentUserClaims;
        private readonly ClaimsPrincipal _currentUser;
        public ProductCatalogController(IEShopLogger<ProductCatalogController> logger, IProductCatalogRepository repository)
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
        [Authorize(Policy = "Consumer")]
        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value });
            var products = _repository.GetAllProducts();
            return Ok(products);
        }

    }
}
