import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { JJCurrencyComponent } from './jj-currency/jj-currency.component';
import { JjNewsTickerComponent } from './jj-news-ticker/jj-news-ticker.component';

const components = [JJCurrencyComponent, JjNewsTickerComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  exports: components,
  declarations: components,
})
export class JJComponentsModule {}
