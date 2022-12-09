import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPageRoutingModule } from './wallet-routing.module';

import { WalletPage } from './wallet.page';
import { TranslateModule } from '@ngx-translate/core';
import { JJComponentsModule } from '../../@components/jj-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    TranslateModule,
    JJComponentsModule,
    
  ],
  declarations: [WalletPage]
})
export class WalletPageModule {}
