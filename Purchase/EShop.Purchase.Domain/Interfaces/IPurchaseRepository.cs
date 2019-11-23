using EShop.Purchasing.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Purchasing.Domain.Interfaces
{
    public interface IPurchaseRepository
    {
        Purchase GetPurchase(string id);
        bool DeletePurchase(string id);
        /// <summary>
        /// only for the demo useage. Real app should connnect to a search engine
        /// </summary>
        /// <returns>all products</returns>
        List<Purchase> GetAllPurchases();
    }
}
