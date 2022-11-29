import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';
import { SharedModule } from 'src/app/jj/shared';
import { RewardsComponentsModule } from '../../@components/rewards-components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ListPageRoutingModule, SharedModule, RewardsComponentsModule],
  declarations: [ListPage],
})
export class ListPageModule {}
