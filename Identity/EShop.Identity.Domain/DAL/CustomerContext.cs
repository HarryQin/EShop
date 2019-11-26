using System;
using System.Collections.Generic;
using System.Text;
using EShop.Identity.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace EShop.Identity.Domain.DAL
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // OnModelCreating
            builder.Entity<Customer>().ToTable("Customer");
            builder.Entity<Customer>().HasKey(t => t.Id);
            builder.Entity<Customer>().Property(t => t.Id).HasColumnName("Id");
            builder.Entity<Customer>().Property(t => t.Name).HasColumnName("Name");
            builder.Entity<Customer>().Property(t => t.Email).HasColumnName("Email");
            builder.Entity<Customer>().Property(t => t.Password).HasColumnName("Password");
        }
    }
}
