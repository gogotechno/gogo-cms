import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (!this.auth.authenticated) {
      this.router.navigateByUrl('/jj/membership/login');
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate() {
    if (this.auth.authenticated) {
      this.router.navigateByUrl('/jj/membership/home', {
        replaceUrl: true,
      });
      return false;
    }
    return true;
  }
}
