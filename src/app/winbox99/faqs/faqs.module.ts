import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaqsPageRoutingModule } from './faqs-routing.module';

import { FaqsPage } from './faqs.page';
import { Winbox99UiModule } from '../winbox99-ui/winbox99-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaqsPageRoutingModule,
    Winbox99UiModule
  ],
  declarations: [FaqsPage]
})
export class FaqsPageModule {}
