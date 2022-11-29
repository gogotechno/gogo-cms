import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { DistributionDetailsComponent } from './distribution-details/distribution-details.component';
import { TicketsComponent } from './tickets/tickets.component';

const components = [DistributionDetailsComponent, TicketsComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, CmsUIModule],
  exports: components,
  declarations: components,
})
export class DetailsComponentsModule {}
