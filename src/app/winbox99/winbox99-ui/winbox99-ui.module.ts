import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { HeaderComponent } from './header/header.component';
import { RegistrationStepsComponent } from './registration-steps/registration-steps.component';
import { GameListComponent } from './game-list/game-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FaqListComponent } from './faq-list/faq-list.component';
import { IphoneComponent } from './iphone/iphone.component';
import { HtmlModalComponent } from './html-modal/html-modal.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    RegistrationStepsComponent,
    GameListComponent,
    FaqListComponent,
    IphoneComponent,
    HtmlModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmsUIModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RegistrationStepsComponent,
    GameListComponent,
    FaqListComponent,
    IphoneComponent
  ]
})
export class Winbox99UiModule { }
