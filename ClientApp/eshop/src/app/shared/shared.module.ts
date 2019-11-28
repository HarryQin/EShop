import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {InterFormsService} from './services/inter-forms.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {AlertService} from './services/alert.service';
import {NotificationComponent} from './components/notification/notification.component';
import {LooseCurrencyPipe} from './pipes/looseCurrency.pipe';
@NgModule({
  declarations: [
    SpinnerComponent, NotificationComponent, LooseCurrencyPipe
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularMaterialModule, RouterModule,
    TranslateModule
  ],
  exports: [SpinnerComponent, NotificationComponent, LooseCurrencyPipe],
  entryComponents: [],
  providers: [CurrencyPipe, LooseCurrencyPipe]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [InterFormsService, AlertService]
    };
  }
}

