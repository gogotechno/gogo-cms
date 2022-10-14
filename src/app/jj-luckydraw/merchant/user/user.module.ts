import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { UserOptionsComponent } from './user-options/user-options.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FullNamePipe } from 'src/app/cms-ui/cms.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [
    UserPage,
    UserOptionsComponent,
    ResetPasswordComponent
  ],
  providers: [
    FullNamePipe
  ]
})
export class UserPageModule { }
