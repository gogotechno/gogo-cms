import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CmsTranslatePipe, CssUrlPipe, FirestoreDatePipe, SafeHtmlPipe } from './cms.pipe';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { FormComponent } from './form/form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationInputComponent } from './translation-input/translation-input.component';
import { ArrayInputComponent } from './array-input/array-input.component';
import { QuillModule } from 'ngx-quill';
import { TranslationEditorInputComponent } from './translation-editor-input/translation-editor-input.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ImageButtonComponent } from './image-button/image-button.component';
import { HtmlViewerComponent } from './html-viewer/html-viewer.component';



@NgModule({
  declarations: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    FormComponent,
    TranslationInputComponent,
    ArrayInputComponent,
    TranslationEditorInputComponent,
    FileInputComponent,
    ImageButtonComponent,
    HtmlViewerComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
    CssUrlPipe,
    FirestoreDatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    QuillModule,
  ],
  exports: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    FormComponent,
    ImageButtonComponent,
    HtmlViewerComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
    CssUrlPipe,
    FirestoreDatePipe,
  ],
  providers: [
    DatePipe,
    CmsTranslatePipe,
  ]
})
export class CmsUIModule { }
