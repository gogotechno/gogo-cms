import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CmsTranslatePipe, SafeHtmlPipe } from './cms.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';



@NgModule({
  declarations: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    SlideshowComponent,
    NavigationComponent,
    AccordionComponent,
    CmsTranslatePipe,
    SafeHtmlPipe,
  ]
})
export class CmsUIModule { }
