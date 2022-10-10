import { Injector, Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";
import { SWS_ERP_COMPANY } from "./sws-erp.type";

@Pipe({ name: 'erpImg' })
export class ErpImagePipe implements PipeTransform {
    companyCode: string;
    constructor(injector: Injector) {
        injector.get(SWS_ERP_COMPANY).subscribe((companyCode) => {
            this.companyCode = companyCode;
        })
    }

    transform(src: string) {
        if (src.startsWith(`/${this.companyCode}`)) {
            src = `${this.transformImgUrl()}${src}`;
        }
        return src;
    }

    private transformImgUrl() {
        let segment = environment.swsErp.apiUrl.split("/");
        console.log(segment);
        return segment.filter((s) => s != "api").join("/");
    }
}