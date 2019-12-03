import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './identity/auth.guard';
import { ProductsComponent } from './components/product/products.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { LoginComponent } from './identity/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'products', component: ProductsComponent },
  {path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
