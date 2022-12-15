import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletsPageRoutingModule } from './wallets-routing.module';
import { JJComponentsModule } from '../@components/jj-components.module';
import { WalletsPage } from './wallets.page';
import { SharedModule } from '../../shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletsPageRoutingModule,
    JJComponentsModule,
    SharedModule,
    CmsUIModule
  ],
  declarations: [WalletsPage]
})
export class WalletsPageModule {}
