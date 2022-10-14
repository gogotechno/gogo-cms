import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
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

export function start_of_day(date: Date) {
    return new Date(date.setHours(0, 0, 0, 0));
}

export function end_of_day(date: Date) {
    return new Date(date.setHours(23, 59, 59, 999));
}

export function timestr_to_date(time: string) {
    let arr = time.split(":").map((val) => Number(val));
    return new Date(new Date().setHours(arr[0], arr[1]));
}

export function empty_object(obj: Object) {
    return !obj || Object.keys(obj).length <= 0;
}

@Injectable({
    providedIn: 'root'
})
export class CmsUtils {

    constructor(private translate: TranslateService) { }

    /**
     * Convert JSON string to CmsTranslation object
     * @param jsonString JSON string
     * @param defaultText Default text if conversion failed, use original JSON string if not provided
     * @returns Returns converted CmsTranslation object
     */
    transformJSONStringtoCMSTranslation(jsonString: string, defaultText?: string) {
        try {
            return JSON.parse(jsonString);
        } catch (err) {
            let lang = this.translate.currentLang;
            let text = defaultText || jsonString;
            return {
                [lang]: text
            }
        }
    }

}

@Injectable({
    providedIn: 'root'
})
export class AppUtils {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private translate: TranslateService
    ) { }

    /**
     * Load template theme
     * @param template Template name
     */
    loadTemplateTheme(template: string) {
        const head = this.document.getElementsByTagName("head")[0];
        const themeLink = this.document.getElementById("dynamic-theme") as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = template + ".css";
        } else {
            const link = this.document.createElement("link");
            link.id = "dynamic-theme";
            link.rel = "stylesheet";
            link.href = template + ".css";
            head.appendChild(link);
        }
    }

    /**
     * Present alert dialog
     * @param message Message text
     * @param header Header text
     */
    async presentAlert(message: string, header?: string, options?: CmsAlertOptions) {
        const defaultOpts: AlertOptions = { buttons: [await this.translate.get("_CONFIRM").toPromise()] }
        header = header ? header : "_INFORMATION";
        if (!options) {
            options = defaultOpts;
        } else {
            if (!options.buttons) options.buttons = defaultOpts.buttons;
            if (options.subHeader) options.subHeader = await this.translate.get(options.subHeader).toPromise();
        }
        const alert = await this.alertCtrl.create({
            header: await this.translate.get(header).toPromise(),
            message: await this.translate.get(message).toPromise(),
            ...options
        })
        await alert.present();
    }

    /**
     * Present loading
     */
    async presentLoading(message?: string) {
        if (await this.getTopLoading()) return;
        message = message ? message : "_LOADING";
        let defaultOpts: LoadingOptions = { spinner: "bubbles" };
        const loading = await this.loadingCtrl.create({
            message: await this.translate.get(message).toPromise(),
            ...defaultOpts
        });
        await loading.present();
    }

    /**
     * Dismiss loading
     * @returns Returns null if no loading presenting
     */
    async dismissLoading() {
        if (!await this.getTopLoading()) return;
        await this.loadingCtrl.dismiss();
    }

    /**
     * Get current top overlay of loading if exists
     * @returns Returns the top overlay
     */
    async getTopLoading() {
        return this.loadingCtrl.getTop();
    }

    /**
     * Present confirm alert
     * @param message Message
     * @param header Header
     * @param confirmBtnText Confirm button text, default is "Confirm" 
     * @param cancelBtnText Cancel button text, default is "Cancel"
     * @returns Returns a promise that resolves true or false
     */
    async presentConfirm(message: string, header?: string, confirmBtnText?: string, cancelBtnText?: string, options?: CmsConfirmOptions) {
        header = header ? header : "_CONFIRMATION";
        confirmBtnText = confirmBtnText ? confirmBtnText : "_CONFIRM";
        cancelBtnText = cancelBtnText ? cancelBtnText : "_CANCEL";
        if (!options) {

        } else {
            if (options.subHeader) options.subHeader = await this.translate.get(options.subHeader).toPromise();
        }
        return new Promise<boolean>(async (resolve) => {
            const confirm = await this.alertCtrl.create({
                header: await this.translate.get(header).toPromise(),
                message: await this.translate.get(message).toPromise(),
                buttons: [
                    {
                        text: await this.translate.get(cancelBtnText).toPromise(),
                        role: "cancel",
                        id: "cancel-button",
                        handler: () => { resolve(false); }
                    },
                    {
                        text: await this.translate.get(confirmBtnText).toPromise(),
                        id: "confirm-button",
                        handler: () => { resolve(true); }
                    }
                ],
                ...options
            })

            await confirm.present();
        })
    }

}

interface CmsConfirmOptions extends Omit<AlertOptions, "header" | "message" | "buttons"> { };
interface CmsAlertOptions extends Omit<AlertOptions, "header" | "message"> { }
