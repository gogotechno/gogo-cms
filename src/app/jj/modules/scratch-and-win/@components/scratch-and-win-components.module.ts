import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { ScratchPrizesComponent } from './scratch-prizes/scratch-prizes.component';
import { ScratchResultComponent } from './scratch-result/scratch-result.component';

const components = [ScratchPrizesComponent, ScratchResultComponent];

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
export class ScratchAndWinComponentsModule {}
