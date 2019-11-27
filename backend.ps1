    $gatewayProjectFolder = 'EShop.Gateway'
    $productProjectFolder = 'ProductCatalog\EShop.ProductCatalog.Api'
    $identityProjectFolder = 'Identity\EShop.Identity.Api'
    $purchaseProjectFolder = 'Purchase\EShop.Purchasing.Api'

Write-Host "STARTING Gateway" -foreground Green

    Push-Location $gatewayProjectFolder 

    $dotnetRunCommand = 'run'
    $gatewayProcess = Start-Process dotnet -ArgumentList $dotnetRunCommand -PassThru

    Pop-Location


Write-Host "STARTING Identity" -foreground Blue

    Push-Location $identityProjectFolder

    $identityProcess = Start-Process dotnet -ArgumentList $dotnetRunCommand -PassThru

    Pop-Location


Write-Host "STARTING ProductCatalog" -foreground Blue

    Push-Location $productProjectFolder

    $productProcess = Start-Process dotnet -ArgumentList $dotnetRunCommand -PassThru

    Pop-Location


Write-Host "STARTING Purchase" -foreground Blue

    Push-Location $purchaseProjectFolder

    $purchaseProcess = Start-Process dotnet -ArgumentList $dotnetRunCommand -PassThru

    Pop-Location


Read-Host -Prompt "Press Enter to exit"