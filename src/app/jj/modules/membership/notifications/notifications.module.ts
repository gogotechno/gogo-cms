import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { NotificationsPage } from './notifications.page';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
  ],
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
