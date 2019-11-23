using EShop.ProductCatalog.Domain.Interfaces;
using EShop.ProductCatalog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EShop.ProductCatalog.Domain.DAL
{
    public class ProductCatalogSqlRepository : IProductCatalogRepository, IDisposable
    {
        protected readonly ProductCatalogContext _context;

        public ProductCatalogSqlRepository(ProductCatalogContext context)
        {
            _context = context;
        }
        public Product GetProduct(int id)
        {
            var product = _context.Products
               .Where(q => //q.Expiration > 0 && 
               q.Id == id).FirstOrDefault();

            return product;
        }
        public List<Product> GetAllProducts()
        {
            throw new NotImplementedException();
        }
        public void Dispose()
        {
            if (_context != null)
            {
                _context.Dispose();
            }
        }
    }
}
