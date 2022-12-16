import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { ContentBoxComponent } from './content-box/content-box.component';

const components = [ContentBoxComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  exports: components,
  declarations: components,
})
export class CommonComponentsModule {}
