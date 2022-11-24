import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangePasswordPageRoutingModule } from './change-password-routing.module';
import { ChangePasswordPage } from './change-password.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ChangePasswordPageRoutingModule, SharedModule, CmsUIModule],
  declarations: [ChangePasswordPage],
})
export class ChangePasswordPageModule {}
