import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletsPageRoutingModule } from './wallets-routing.module';

import { WalletsPage } from './wallets.page';
import { TranslateModule } from '@ngx-translate/core';
import { JjCurrencyModule } from '../../components/jj-currency/jj-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletsPageRoutingModule,
    TranslateModule,
    JjCurrencyModule,
  ],
  declarations: [WalletsPage]
})
export class WalletsPageModule {}
