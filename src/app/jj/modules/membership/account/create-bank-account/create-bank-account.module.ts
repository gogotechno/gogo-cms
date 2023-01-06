import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBankAccountPageRoutingModule } from './create-bank-account-routing.module';

import { CreateBankAccountPage } from './create-bank-account.page';

import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBankAccountPageRoutingModule,
    SharedModule,
    CmsUIModule,
  ],
  declarations: [CreateBankAccountPage]
})
export class CreateBankAccountPageModule {}
