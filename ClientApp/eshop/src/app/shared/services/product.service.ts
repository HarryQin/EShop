import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../DTO/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   // Base url
   private baseUrl = `${environment.gateway.url}/Catalog-api/ProductCatalog`;
  constructor(private http: HttpClient,  @Inject(LOCALE_ID) public locale: string ) { }

  Get(sku: string): Observable<Product> {
    const url = `${this.baseUrl}/Get/` + sku;
    return this.http.get<any>(url)
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }
  GetAll(): Observable<Product[]> {
    const url = `${this.baseUrl}/GetAll`;
    return this.http.get<any>(url)
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }
   // Error handling
   errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
