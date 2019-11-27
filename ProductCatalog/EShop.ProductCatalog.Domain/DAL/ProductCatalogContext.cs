using EShop.ProductCatalog.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace EShop.ProductCatalog.Domain.DAL
{
    public class ProductCatalogContext : DbContext
    {
        public ProductCatalogContext(DbContextOptions<ProductCatalogContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // OnModelCreating
            builder.Entity<Product>().ToTable("Product");
            builder.Entity<Product>().HasKey(t => t.Id);
            builder.Entity<Product>().Property(t => t.Id).HasColumnName("Id");
            builder.Entity<Product>().Property(t => t.Name).HasColumnName("Name");
            builder.Entity<Product>().Property(t => t.Price).HasColumnName("Price");
        }
    }
}
