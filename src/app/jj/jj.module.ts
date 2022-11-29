import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JJPageRoutingModule } from './jj-routing.module';
import { JJPage } from './jj.page';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    JJPageRoutingModule
  ],
  declarations: [JJPage],
})
export class JJPageModule {}
