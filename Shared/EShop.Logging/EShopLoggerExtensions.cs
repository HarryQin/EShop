using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;

namespace EShop.Logging
{
    public static class EShopLoggerExtensions
    {
        private static string GetInstrumentationKey() => Environment.GetEnvironmentVariable("SOFT_INSTRUMENTATIONKEY");

        public static IWebHostBuilder ConfigureLogging<TProgram, TStartup>(this IWebHostBuilder hostBuilder)
        {
            return hostBuilder.ConfigureLogging(builder =>
                {
                    builder.AddAzureWebAppDiagnostics();
                    // Providing an instrumentation key here is required if you're using standalone package Microsoft.Extensions.Logging.ApplicationInsights
                    // or if you want to capture logs from early in the application startup pipeline from Startup.cs or Program.cs itself.
                    //builder.AddApplicationInsights(GetInstrumentationKey());
                    
                    // Adding the filter below to ensure logs of all severity from Program.cs is sent to ApplicationInsights.
                    builder.AddFilter<ApplicationInsightsLoggerProvider>(typeof(TProgram).FullName, LogLevel.Trace);
                    
                    // Adding the filter below to ensure logs of all severity from Startup.cs is sent to ApplicationInsights.
                    builder.AddFilter<ApplicationInsightsLoggerProvider>(typeof(TStartup).FullName, LogLevel.Trace);

                });
        }
    }
}
