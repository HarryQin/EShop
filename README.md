EShop - Demo how to use .net core Micro services and Angular 8.
=============================
Setup the Database:
1. Create a database EShop on localdb or sql server;
2. run EShop\DBScripts\init.sql

Change the connection string in 
EShop\ProductCatalog\EShop.ProductCatalog.Api\appsettings.Development.json|appsettings.json
EShop\\Purchase\EShop.Purchasig.Api\appsettings.Development.json|appsettings.json
EShop\\\Identity\EShop.\Identity.Api\appsettings.Development.json|appsettings.json


Run backend
open a powershell window and go to the .\EShop\ root folder
```shell
./backend.cmd
```

run frontend
EShop\ClientApp\eshop
```shell
npm run deub
```