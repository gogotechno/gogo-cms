import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { WalletPage } from './wallet.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    JJComponentsModule,
    SharedModule,
    CmsUIModule,
  ],
  declarations: [WalletPage],
})
export class WalletPageModule {}
