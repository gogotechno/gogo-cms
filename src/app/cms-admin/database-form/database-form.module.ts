import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatabaseFormPageRoutingModule } from './database-form-routing.module';

import { DatabaseFormPage } from './database-form.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatabaseFormPageRoutingModule,
    CmsUIModule,
    TranslateModule
  ],
  declarations: [DatabaseFormPage]
})
export class DatabaseFormPageModule {}
