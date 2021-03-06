using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using EShop.Logging;
using EShop.Identity.Domain.DAL;
using EShop.Identity.Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace EShop.Identity.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();
            services.AddSingleton(typeof(IEShopLogger<>), typeof(EShopLogger<>));
            
            var builder = new SqlConnectionStringBuilder(
                Configuration.GetConnectionString("Default"));

            services.AddDbContext<CustomerContext>(options =>
                options.UseSqlServer(builder.ConnectionString)
            );
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("Secret"));
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {              
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                };
            });

            // configure DI for application services
            //services.AddScoped<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(x => x
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions
            //{
            //    ClientId = Configuration["ClientId"],
            //    ClientSecret = Configuration["ClientSecret"],
            //    Authority = Configuration["Authority"],
            //    ResponseType = OpenIdConnectResponseType.Code,
            //    GetClaimsFromUserInfoEndpoint = true
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
