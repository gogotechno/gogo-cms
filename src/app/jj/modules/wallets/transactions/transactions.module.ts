import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransactionsPageRoutingModule } from './transactions-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { TransactionsPage } from './transactions.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    JJComponentsModule,
    ScrollingModule,
    SharedModule,
    CmsUIModule,
  ],
  declarations: [TransactionsPage],
})
export class TransactionsPageModule {}
