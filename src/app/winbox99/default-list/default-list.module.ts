import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultListPageRoutingModule } from './default-list-routing.module';

import { DefaultListPage } from './default-list.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultListPageRoutingModule,
    CmsUIModule,
  ],
  declarations: [DefaultListPage]
})
export class DefaultListPageModule {}
