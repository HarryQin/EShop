using EShop.Identity.Domain.Interfaces;
using EShop.Identity.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EShop.Identity.Domain.DAL
{
    public class CustomerRepository : ICustomerRepository, IDisposable
    {
        protected readonly CustomerContext _context;
        public CustomerRepository(CustomerContext context)
        {
            _context = context;
        }
        public Customer GetCustomer(int id) 
        {
            var customer = _context.Customers
               .Where(q => q.Id == id).First();

            return customer;
        }
        public Customer GetCustomerbyEmail(string email) 
        {
            var customer = _context.Customers
                   .Where(q => q.Email.ToLower() == email.ToLower()).First();

            return customer;
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
