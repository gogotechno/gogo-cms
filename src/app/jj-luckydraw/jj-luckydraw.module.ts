import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JjLuckydrawPageRoutingModule } from './jj-luckydraw-routing.module';

import { JjLuckydrawPage } from './jj-luckydraw.page';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './jj-luckydraw.interceptors';
import { AuthGuard, SignInGuard } from './jj-luckydraw.guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JjLuckydrawPageRoutingModule,
    TranslateModule
  ],
  declarations: [JjLuckydrawPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    AuthGuard,
    SignInGuard
  ],
  bootstrap: [JjLuckydrawPage]
})
export class JjLuckydrawPageModule { }
