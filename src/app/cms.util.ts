import { Injectable } from "@angular/core";
import { AlertController, AlertOptions, LoadingController, LoadingOptions } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

export function array_move(arr: Array<any>, old_index: number, new_index: number) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export function getTime(time: string) {
    let arr = time.split(":");
    let hour = Number(arr[0]);
    let minute = Number(arr[1]);
    return {
        hour: hour,
        minute: minute
    }
}

@Injectable({
    providedIn: 'root'
})
export class AppUtils {

    constructor(
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private translate: TranslateService
    ) { }

    /**
     * Present alert dialog
     * @param message Message text
     * @param header Header text
     */
    async presentAlert(message: string, header?: string) {
        header = header ? header : "_INFORMATION";

        let defaultOpts: AlertOptions = {
            buttons: [await this.translate.get("_CONFIRM").toPromise()]
        }

        const alert = await this.alertCtrl.create({
            header: await this.translate.get(header).toPromise(),
            message: await this.translate.get(message).toPromise(),
            ...defaultOpts
        })

        await alert.present();
    }

    /**
     * Present loading
     */
    async presentLoading() {
        let defaultOpts: LoadingOptions = {
            message: await this.translate.get("_LOADING").toPromise(),
            spinner: "bubbles"
        };

        const loading = await this.loadingCtrl.create(defaultOpts);

        await loading.present();
    }

    /**
     * Dismiss loading
     * @returns Returns null if no loading presenting
     */
    async dismissLoading() {
        const isLoading = await this.loadingCtrl.getTop();
        if (!isLoading) return;

        await this.loadingCtrl.dismiss();
    }

}