import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponentsModule } from './@components/home-components.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
     CommonModule,
     FormsModule, 
     IonicModule, 
     HomePageRoutingModule, 
     HomeComponentsModule,
    ],
    exports: [],
  declarations: [HomePage],
})
export class HomePageModule {}
