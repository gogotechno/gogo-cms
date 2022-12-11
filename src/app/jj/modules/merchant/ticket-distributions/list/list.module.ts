import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListPageRoutingModule } from './list-routing.module';
import { ListComponentsModule } from './@components/list-components.module';
import { MerchantComponentsModule } from '../../@components/merchant-components.module';
import { ListPage } from './list.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    ListComponentsModule,
    MerchantComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [ListPage],
})
export class ListPageModule {}
