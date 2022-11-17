import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JJMembershipPageRoutingModule } from './jj-membership-routing.module';
import { JJMembershipPage } from './jj-membership.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, JJMembershipPageRoutingModule],
  declarations: [JJMembershipPage],
})
export class JJMembershipPageModule {}
