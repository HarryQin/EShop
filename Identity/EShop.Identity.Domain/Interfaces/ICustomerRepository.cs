using EShop.Identity.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Identity.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Customer GetCustomer(int id);
        Customer GetCustomerbyEmail(string email);
    }
}
