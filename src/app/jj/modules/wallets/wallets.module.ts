import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletsPageRoutingModule } from './wallets-routing.module';

import { WalletsPage } from './wallets.page';
import { TranslateModule } from '@ngx-translate/core';
import { JJComponentsModule } from '../@components/jj-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletsPageRoutingModule,
    TranslateModule,
    JJComponentsModule,
  ],
  declarations: [WalletsPage]
})
export class WalletsPageModule {}
