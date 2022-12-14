import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage } from './details.page';
import { DetailsComponentsModule } from './@components/details.components.module';
import { DetailsService } from './@services/details.service';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule, DetailsComponentsModule, SharedModule],
  declarations: [DetailsPage],
  providers: [DetailsService],
})
export class DetailsPageModule { }
