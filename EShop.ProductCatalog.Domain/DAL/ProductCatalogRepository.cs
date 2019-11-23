using EShop.ProductCatalog.Domain.Interfaces;
using EShop.ProductCatalog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.ProductCatalog.Domain.DAL
{
    public class ProductCatalogDemoRepository : IProductCatalogRepository, IDisposable
    {
        protected readonly ProductCatalogContext _context;

        public ProductCatalogDemoRepository(ProductCatalogContext context)
        {
            _context = context;
        }
        public Product GetProduct(int id)
        {
            throw new NotImplementedException();
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
