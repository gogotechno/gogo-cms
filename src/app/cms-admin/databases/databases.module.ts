import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatabasesPageRoutingModule } from './databases-routing.module';

import { DatabasesPage } from './databases.page';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabasesPageRoutingModule,
    TranslateModule,
    ScrollingModule,
    CmsUIModule,
  ],
  declarations: [DatabasesPage]
})
export class DatabasesPageModule {}
