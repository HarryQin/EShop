import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtInterceptor } from './identity/jwt.interceptor';
import { ErrorInterceptor } from './identity/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { LoggerModule } from 'ngx-logger';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InterFormsService } from './shared/services/inter-forms.service';
import { LoginComponent } from './identity/login/login.component';
import { ProductsComponent } from './components/product/products.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './identity/authentication.service';
import { AuthGuard } from './identity/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('idToken') ? localStorage.getItem('idToken') : 'UNKNOWN';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot(environment.configLog),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000', 'azurewebsites.net'],
        blacklistedRoutes: [''],
        throwNoTokenError: true
      }
    }),
  ],
  providers: [
    AuthenticationService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}