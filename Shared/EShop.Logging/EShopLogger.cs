using Microsoft.Extensions.Logging;
using System;

namespace EShop.Logging
{
    public class EShopLogger<T> : IEShopLogger<T>
    {
        private readonly ILogger<T> _logger;

        public EShopLogger(ILogger<T> logger)
        {
            _logger = logger;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return _logger.BeginScope<TState>(state);
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return _logger.IsEnabled(logLevel);
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            _logger.Log<TState>(logLevel, eventId, state, exception, formatter);
        }
    }
}
