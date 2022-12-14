import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { TicketComponent } from './ticket/ticket.component';

const components = [TicketComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  exports: components,
  declarations: components,
})
export class DetailsComponentsModule {}
