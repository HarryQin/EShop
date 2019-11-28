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
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_SETTINGS,  AppSettings } from './shared/configuration/appSettings';
import {InterFormsService} from './shared/services/inter-forms.service';
import { LoginComponent } from './identity/login/login.component';


export function tokenGetter() {
  return localStorage.getItem('idToken') ? localStorage.getItem('idToken') : 'UNKNOWN';
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:7000', 'azurewebsites.net'],
        blacklistedRoutes: [''],
        throwNoTokenError: true
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_SETTINGS,
      useClass: AppSettings
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
