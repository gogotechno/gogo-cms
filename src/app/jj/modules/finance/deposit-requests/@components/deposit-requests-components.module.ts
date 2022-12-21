import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { FilterComponent } from './filter/filter.component';

const components = [
  FilterComponent
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    SharedModule, 
    CmsUIModule,
    SwsErpModule
  ],
  exports: components,
  declarations: components,
})
export class DepositRequestsComponentsModule {}
