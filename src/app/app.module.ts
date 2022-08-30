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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SiteGuardService } from './cms-ui/route-guards.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { QuillModule } from 'ngx-quill';

import Quill from 'quill'

const parchment = Quill.import('parchment');
const block = parchment.query('block');
block.tagName = "DIV";
Quill.register(block, true);

import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
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
          [{ 'font': [] }, { 'size': [] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'super' }, { 'script': 'sub' }],
          [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['direction', { 'align': [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean']
        ],
        blotFormatter: {}
      }
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    SiteGuardService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}