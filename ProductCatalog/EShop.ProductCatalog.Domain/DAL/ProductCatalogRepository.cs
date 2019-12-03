using EShop.ProductCatalog.Domain.Interfaces;
using EShop.ProductCatalog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EShop.ProductCatalog.Domain.DAL
{
    public class ProductCatalogRepository : IProductCatalogRepository, IDisposable
    {
        protected readonly ProductCatalogContext _context;

        public ProductCatalogRepository(ProductCatalogContext context)
        {
            _context = context;
        }
        public Product GetProduct(int id)
        {
            return _context.Products.Where(x => x.Id == id).First();
        }
        public List<Product> GetAllProducts()
        {
            return _context.Products.ToList();
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
