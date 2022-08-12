import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CmsTranslatePipe, SafeHtmlPipe } from './cms.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { FormComponent } from './form/form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationInputComponent } from './translation-input/translation-input.component';
import { ArrayInputComponent } from './array-input/array-input.component';



@NgModule({
  declarations: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    FormComponent,
    TranslationInputComponent,
    ArrayInputComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild(),
  ],
  exports: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    FormComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
  ]
})
export class CmsUIModule { }
