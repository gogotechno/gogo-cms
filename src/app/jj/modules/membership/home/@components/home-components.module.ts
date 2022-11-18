import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletCardsComponent } from './wallet-cards/wallet-cards.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [WalletCardsComponent],
  declarations: [WalletCardsComponent],
})
export class MembershipComponentsModule {}
