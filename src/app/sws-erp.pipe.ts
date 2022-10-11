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

    transform(src: string, defaultImg?: string) {
        let imgUrl = this.transformImgUrl();
        if (!src) src = defaultImg || "/assets/image-placeholder.jpg";
        if (this.uploaded(src)) src = `${imgUrl}${src}`;
        return src;
    }

    private uploaded(src: string) {
        return src.startsWith(`/${this.companyCode}`);
    }

    private transformImgUrl() {
        let segment = environment.swsErp.apiUrl.split("/");
        return segment.filter((s) => s != "api").join("/");
    }
}