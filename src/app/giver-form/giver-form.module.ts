import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiverFormPageRoutingModule } from './giver-form-routing.module';

import { GiverFormPage } from './giver-form.page';
import { CmsUIModule } from '../cms-ui/cms-ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiverFormPageRoutingModule,
    CmsUIModule,
    TranslateModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [GiverFormPage]
})
export class GiverFormPageModule {}
