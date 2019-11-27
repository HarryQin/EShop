using EShop.Purchasing.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using EShop.Purchasing.Domain.Interfaces;
using EShop.Purchasing.Domain.Models;
using System.Linq;

namespace EShop.Purchasing.Domain.DAL
{
    public class PurchaseRepository : IPurchaseRepository, IDisposable
    {
        protected readonly PurchaseContext _context;

        public PurchaseRepository(PurchaseContext context)
        {
            _context = context;
        }
        public int AddPurchase(Purchase purchase) 
        {
            _context.Add(purchase);
            _context.SaveChanges();
            return purchase.Id;
        }
        public Purchase GetPurchase(int id)
        {
            return _context.Purchases.Where(x => x.Id == id).First();
        }
        public List<Purchase> GetPurchases(int userId)
        {
            var purchases = _context.Purchases.Where(x => x.UserId == userId);
            if (purchases.Count() == 0)
            {
                return new List<Purchase>();
            }
            else 
            {
                return purchases.ToList();
            }
        }
        public void DeletePurchase(int id)
        {
            var purchase = _context.Purchases.Where(x => x.Id == id && !x.IsDeleted).First();
            if (purchase != null) 
            {
                purchase.IsDeleted = true;
                _context.SaveChanges();
            }
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
