import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SmsComponent } from "./sms/sms.component";

const components = [
    SmsComponent
  ]

  @NgModule({
    declarations: components,
    imports: [
      CommonModule,
      FormsModule,
      IonicModule
    ],
    exports: components
  })
  export class ComponentsModule { }