using EShop.Purchasing.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Purchasing.Domain.Interfaces
{
    public interface IPurchaseRepository
    {
        Purchase GetPurchase(int id);
        List<Purchase> GetPurchases(int userId);
        void DeletePurchase(int id);
    }
}
