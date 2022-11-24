import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { HomeComponentsModule } from './@components/home-components.module';
import { HomeService } from './@services/home.service';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedModule, HomeComponentsModule],
  declarations: [HomePage],
  providers: [HomeService],
})
export class HomePageModule {}
