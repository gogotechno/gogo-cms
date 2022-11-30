import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { JJCurrency } from './jj-currency/jj-currency.component';

const components = [JJCurrency];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  exports: components,
  declarations: components,
})
export class JJComponentsModule {}
