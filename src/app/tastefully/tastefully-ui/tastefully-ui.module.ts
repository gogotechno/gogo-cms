import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EventListComponent } from './event-list/event-list.component';
import { FeedListComponent } from './feed-list/feed-list.component';



@NgModule({
  declarations: [
    EventListComponent,
    FeedListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  exports: [
    EventListComponent,
    FeedListComponent,
  ]
})
export class TastefullyUiModule { }
