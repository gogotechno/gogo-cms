import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CmsTranslatePipe, CssUrlPipe, FirestoreDatePipe, FullNamePipe, HideTextPipe, SafeHtmlPipe } from './cms.pipe';
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
import { FilterComponent } from './filter/filter.component';
import { SearchableSelectComponent } from './searchable-select/searchable-select.component';
import { SearchAreaComponent } from './searchable-select/search-area/search-area.component';
import { ScannerComponent } from './barcode-scanner/scanner/scanner.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { RequiredTagComponent } from './required-tag/required-tag.component';

const internalComponents = [
  ArrayInputComponent,
  TranslationInputComponent,
  TranslationEditorInputComponent,
  FileInputComponent,
  SearchAreaComponent,
  ScannerComponent,
];

const exportedComponents = [
  SlideshowComponent,
  NavigationComponent,
  AccordionComponent,
  FormComponent,
  ImageButtonComponent,
  HtmlViewerComponent,
  FilterComponent,
  SearchableSelectComponent,
  BarcodeScannerComponent,
  RequiredTagComponent,
];

const pipes = [
  CmsTranslatePipe,
  SafeHtmlPipe,
  CssUrlPipe,
  FirestoreDatePipe,
  FullNamePipe,
  HideTextPipe
];

@NgModule({
  declarations: [
    ...internalComponents,
    ...exportedComponents,
    ...pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    QuillModule
  ],
  exports: [
    ...exportedComponents,
    ...pipes
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    ...pipes
  ],
})
export class CmsUIModule {}
