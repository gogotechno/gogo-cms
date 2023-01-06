import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService, CoreService } from '../services';

@Injectable()
export class InitGuard implements CanActivate {
  constructor(private auth: AuthService, private core: CoreService) {}
  async canActivate() {
    await this.core.init();
    await this.auth.init();
    return true;
  }
}
