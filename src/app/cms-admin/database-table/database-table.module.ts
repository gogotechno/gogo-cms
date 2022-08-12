import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { IonicModule } from '@ionic/angular';

import { DatabaseTablePageRoutingModule } from './database-table-routing.module';

import { DatabaseTablePage } from './database-table.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabaseTablePageRoutingModule,
    ScrollingModule,
    CmsUIModule,
  ],
  declarations: [DatabaseTablePage]
})
export class DatabaseTablePageModule {}
