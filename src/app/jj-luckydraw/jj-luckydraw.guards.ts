// AuthGuard Service
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (!this.authService.initialized) {
            await this.authService.init();
        }

        if (!this.authService.authenticated) {
            console.log('Not authenticated! Go to sign in')
            this.router.navigateByUrl('/jj-luckydraw/sign-in', { skipLocationChange: true });
            return false;
        }
        return true;
    }
}

@Injectable()
export class SignInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authService.authenticated) {
            this.router.navigateByUrl('/jj-luckydraw/', { replaceUrl: true });
            return false;
        }
        return true;
    }
}