import {environment} from '../../../environments/environment';
import {InjectionToken} from '@angular/core';

export let APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');

export class AppSettings  {
 public gateway: any  = {
    url: `${environment.gateway.url}`
  };
 public Product: any = {baseUrl: `${environment.gateway.url}/Catalog-api/`
  };
 constructor() {}
}

// export class ContentStackConfig {
//   public api_key = `${environment.contentStack.APIKey}`;
//   public access_token = `${environment.contentStack.token}`;
//   public environment = `${environment.contentStack.publishingEnvironment}`;
// }
