import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const modules = [ReactiveFormsModule, TranslateModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
