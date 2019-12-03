import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

    return next.handle(request);
}
  private onError(errorResponse: HttpErrorResponse) {
    if (!errorResponse) {
      return;
    }
    if (errorResponse.status === 401 && errorResponse.statusText === 'Unauthorized') {
      this.router.navigate(['login']);
    }
  }
}
