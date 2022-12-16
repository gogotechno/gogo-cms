import { Injectable } from '@angular/core';
import { SwsErpService } from 'src/app/sws-erp.service';

@Injectable({
    providedIn: 'root'
})
export class WalletsService {
    constructor(private erp: SwsErpService) {}

    // async getMyWallets(): Wallet[] {
    //     return this.erp.getDocs('')
    // }
}
