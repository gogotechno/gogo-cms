import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SiteGuard } from './cms-ui/route-guards.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
const Parchment = Quill.import('parchment');
const Block = Parchment.query('block');
class NewBlock extends Block { };
NewBlock.tagName = 'div';
Quill.register(NewBlock, true);

import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

import { VideoHandler, ImageHandler } from 'ngx-quill-upload';
import { NgxMaskModule } from 'ngx-mask';
Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/videoHandler', VideoHandler);

import { IonicStorageModule } from '@ionic/storage-angular';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

import { SwsErpInterceptor } from './sws-erp.interceptors';
import { SWS_ERP_COMPANY } from './sws-erp.type';

import { BehaviorSubject } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
    scrollAssist: false,
    scrollPadding: false }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: [] }],
          [{ header: [] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video', 'formula']
        ]
      }
    }),
    IonicStorageModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SwsErpInterceptor,
      multi: true
    },
    {
      provide: SWS_ERP_COMPANY,
      useValue: new BehaviorSubject<string>('default')
    },
    SiteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
