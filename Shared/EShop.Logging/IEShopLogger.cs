using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Logging
{
    interface IEShopLogger<out T> : ILogger<T>
    {
    }
}
