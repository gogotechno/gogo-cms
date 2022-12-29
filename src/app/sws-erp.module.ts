import { NgModule } from '@angular/core';
import { ErpImagePipe, ErpTranslationPipe } from './sws-erp.pipe';
import { SwsFileHandler } from './sws-erp.service';

const pipes = [
  ErpImagePipe, 
  ErpTranslationPipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [],
  exports: [
    ...pipes
  ],
  providers: [
    ...pipes, 
    SwsFileHandler
  ],
})
export class SwsErpModule {}
