import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
        // logged in so return true
        return true;
    }
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
