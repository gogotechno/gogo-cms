import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { MoreOptionsComponent } from './more-options/more-options.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const components = [MoreOptionsComponent, ResetPasswordComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, CmsUIModule],
  exports: components,
  declarations: components,
})
export class DetailsComponentsModule {}
