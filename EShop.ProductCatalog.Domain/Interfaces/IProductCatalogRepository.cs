using EShop.ProductCatalog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.ProductCatalog.Domain.Interfaces
{
    public interface IProductCatalogRepository
    {
        Product GetProduct(int id);
        /// <summary>
        /// only for the demo useage. Real app should connnect to a search engine
        /// </summary>
        /// <returns>all products</returns>
        List<Product> GetAllProducts();

    }
}
