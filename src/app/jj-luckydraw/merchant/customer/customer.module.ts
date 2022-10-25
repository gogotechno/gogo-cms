import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { FullNamePipe } from 'src/app/cms-ui/cms.pipe';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule,
    ComponentsModule
  ],
  declarations: [CustomerPage],
  providers: [
    FullNamePipe
  ]
})
export class CustomerPageModule {}
