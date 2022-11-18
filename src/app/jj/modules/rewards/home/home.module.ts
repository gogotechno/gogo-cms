import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { HomeComponentsModule } from './@components/home-components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, HomeComponentsModule],
  declarations: [HomePage],
})
export class HomePageModule {}
