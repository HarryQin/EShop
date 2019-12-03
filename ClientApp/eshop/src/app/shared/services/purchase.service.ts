import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Purchase } from '../DTO/purchase';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
   // Base url
   private baseUrl = `${environment.gateway.url}/Purchase-api/Purchase`;
  constructor(private http: HttpClient,  @Inject(LOCALE_ID) public locale: string ) { }

  Get(id: string): Observable<Purchase> {
    const url = `${this.baseUrl}/Get/` + id;
    return this.http.get<any>(url)
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }
  Add(productId: number, customerId: number): Observable<Purchase> {
    const data = {
      product: productId,
      custom: customerId
  };
    const url = `${this.baseUrl}/Add/`;
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    return this.http.post<any>(url, data, httpOptions );
  }
  Delete(id: string): Observable<Purchase[]> {
    const url = `${this.baseUrl}/Delete/` + id;
    return this.http.get<any>(url)
    .pipe(
      retry(1),
      catchError(this.errorHandle)
    );
  }
  GetAll(): Observable<Purchase[]> {
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
