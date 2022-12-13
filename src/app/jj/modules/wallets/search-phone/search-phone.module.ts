import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPhonePageRoutingModule } from './search-phone-routing.module';

import { SearchPhonePage } from './search-phone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPhonePageRoutingModule
  ],
  declarations: [SearchPhonePage]
})
export class SearchPhonePageModule {}
