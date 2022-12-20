import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { WalletsComponentsModule } from '../../@components/wallets-components.module';
import { ChooseBankAccountComponent } from './choose-bank-account/choose-bank-account.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';

const components = [
  ChooseBankAccountComponent,
  CreateBankAccountComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    SharedModule, 
    CmsUIModule, 
    SwsErpModule, 
    WalletsComponentsModule
  ],
  exports: components,
})
export class CreateWithdrawComponentsModule {}
