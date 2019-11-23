using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EShop.Purchasing.Domain.Models;

namespace EShop.Purchasing.Domain.DAL
{
    public class PurchaseContext : DbContext
    {
        public PurchaseContext(DbContextOptions<PurchaseContext> options) : base(options)
        {
        }
        public DbSet<Purchase> Purchases { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // OnModelCreating
            builder.Entity<Purchase>().ToTable("Purchase");
            builder.Entity<Purchase>().HasKey(t => t.Id);
            builder.Entity<Purchase>().Property(t => t.Id).HasColumnName("Id");
            builder.Entity<Purchase>().Property(t => t.UserId).HasColumnName("UserId");
            builder.Entity<Purchase>().Property(t => t.ProductId).HasColumnName("ProductId");


        }
    }
}
