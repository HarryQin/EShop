import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { User } from '../shared/DTO/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
      private http: HttpClient,
      private storage: LocalStorageService
      ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.storage.retrieve('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, pwd: string) {
        const data = {
            email: email,
            password: pwd
        };
        const url = `${environment.gateway.url}/identity-api/auth/authenticate`;
        console.log(url);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          };
        return this.http.post<any>(url, data, httpOptions )
            .pipe(map(user => {
                this.storage.store('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log(user);
                return user;
           }));
    }
    logout() {
        // remove user from local storage to log user out
        this.storage.clear('currentUser');
        this.currentUserSubject.next(null);
    }
}
