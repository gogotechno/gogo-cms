import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    LoginPageRoutingModule, 
    SharedModule, 
    CmsUIModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
