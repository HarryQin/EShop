using EShop.Purchasing.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using EShop.Purchasing.Domain.Interfaces;
using EShop.Purchasing.Domain.Models;

namespace EShop.Purchasing.Domain.DAL
{
    class PurchaseRepository : IPurchaseRepository, IDisposable
    {
        protected readonly PurchaseContext _context;

        public PurchaseRepository(PurchaseContext context)
        {
            _context = context;
        }
        public Purchase GetPurchase(string id)
        {
            throw new NotImplementedException();
        }

        public bool DeletePurchase(string id)
        {
            throw new NotImplementedException();
        }

        public List<Purchase> GetAllPurchases()
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
