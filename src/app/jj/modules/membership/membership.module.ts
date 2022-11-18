import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipPageRoutingModule } from './membership-routing.module';

import { MembershipPage } from './membership.page';
import { WalletCardsModule } from './components/wallet-cards/wallet-cards.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MembershipPageRoutingModule, WalletCardsModule],
  declarations: [MembershipPage],
})
export class MembershipPageModule {}
