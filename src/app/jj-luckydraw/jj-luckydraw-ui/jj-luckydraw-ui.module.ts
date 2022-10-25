import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { EventWithWinningSummaryComponent } from './event-with-winning-summary/event-with-winning-summary.component';

const components = [
  EventWithWinningSummaryComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  exports: [
    ...components
  ]
})
export class JJLuckydrawUiModule { }
