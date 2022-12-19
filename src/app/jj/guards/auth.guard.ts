import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  async canActivate() {
    if (!this.auth.authenticated) {
      await this.router.navigate(['/jj/login'], { queryParamsHandling: 'merge' });
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
  async canActivate() {
    if (this.auth.authenticated) {
      await this.router.navigate(['/jj'], { queryParamsHandling: 'merge' });
      return false;
    }
    return true;
  }
}
