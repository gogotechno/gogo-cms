import { NgModule } from '@angular/core';
import { ErpImagePipe, ErpTranslationPipe } from './sws-erp.pipe';

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
    ]
})
export class SwsErpModule { }
