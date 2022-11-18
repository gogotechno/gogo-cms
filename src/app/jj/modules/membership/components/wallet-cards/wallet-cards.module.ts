import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletCardsComponent } from './wallet-cards.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [WalletCardsComponent],
  declarations: [WalletCardsComponent],
})
export class WalletCardsModule {}
