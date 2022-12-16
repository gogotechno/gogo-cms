import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';

const components = [
  MenuHeaderComponent,
  MenuContentComponent,
  MenuFooterComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SharedModule
  ],
  exports: components,
  declarations: components,
})
export class MerchantComponentsModule {}
