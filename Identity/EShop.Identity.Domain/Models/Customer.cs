using System.ComponentModel.DataAnnotations.Schema;

namespace EShop.Identity.Domain.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}
