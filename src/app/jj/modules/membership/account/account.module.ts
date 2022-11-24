import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { AccountComponentsModule } from './@components/account-components.module';
import { AccountService } from './@services/account.service';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountPageRoutingModule, SharedModule, AccountComponentsModule],
  declarations: [AccountPage],
  providers: [AccountService],
})
export class AccountPageModule {}
