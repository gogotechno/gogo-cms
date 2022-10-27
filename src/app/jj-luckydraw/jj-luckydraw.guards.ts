import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JJLuckydrawService } from './jj-luckydraw.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private lucky: JJLuckydrawService) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (!this.lucky.initialized) {
            await this.lucky.init();
        }
        if (!this.auth.initialized) {
            await this.auth.init();
        }
        if (!this.auth.authenticated) {
            console.log("Not authenticated!");
            this.router.navigateByUrl("/jj-luckydraw/sign-in");
            return false;
        }
        return true;
    }
}

@Injectable()
export class SignInGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private lucky: JJLuckydrawService) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (!this.lucky.initialized) {
            await this.lucky.init();
        }
        if (!this.auth.initialized) {
            await this.auth.init();
        }
        if (this.auth.authenticated) {
            console.log("Authenticated!");
            this.router.navigateByUrl("/jj-luckydraw", { replaceUrl: true });
            return false;
        }
        return true;
    }
}