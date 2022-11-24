import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountBarComponent } from './account-bar/account-bar.component';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { RouterModule } from '@angular/router';

const components = [AccountBarComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SharedModule, CmsUIModule, SwsErpModule],
  exports: components,
  declarations: components,
})
export class AccountComponentsModule {}
