using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Purchasing.Domain.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
