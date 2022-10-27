import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JJLuckydrawPageRoutingModule } from './jj-luckydraw-routing.module';

import { JJLuckydrawPage } from './jj-luckydraw.page';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard, SignInGuard } from './jj-luckydraw.guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JJLuckydrawPageRoutingModule,
    TranslateModule
  ],
  declarations: [JJLuckydrawPage],
  providers: [
    AuthGuard,
    SignInGuard
  ]
})
export class JJLuckydrawPageModule { }
