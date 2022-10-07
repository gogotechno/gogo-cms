import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AlertController, LoadingController } from "@ionic/angular";
import { from } from "rxjs";
import { AuthService } from "./jj-luckydraw/auth.service";

@Injectable()
export class SwsErpInterceptor implements HttpInterceptor {
    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private auth: AuthService) { }
    //function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next));

    }

    async handle(request: HttpRequest<any>, next: HttpHandler) {
        console.log(request)
        let apiUrl = environment.swsErp.ApiUrl;
        if (request.url.substring(0, apiUrl.length) === apiUrl) {
            console.log('Is a ERP request');
            let loading = await this.loadingCtrl.create();
            if (!await this.loadingCtrl.getTop()) {
                loading.present();
            }

            let updatedRequest = request.clone(request);

            //how to update the request Parameters
            if (this.auth.token) {
                updatedRequest = request.clone({
                    headers: request.headers.set("Authorization", `Bearer ${this.auth.token}`)
                });
            }
            //logging the updated Parameters to browser's console
            // console.log("Before making api call : ", updatedRequest);

            return next.handle(updatedRequest).pipe(
                tap(
                    (event) => {
                        //logging the http response to browser's console in case of a success
                        if (event instanceof HttpResponse) {
                            console.log("api call success :", event);
                        }
                    },
                    async (error) => {
                        console.log(error)
                        let header = 'UNKNOWN ERROR'
                        let message = 'UNKNOWN ERROR';
                        if (error instanceof HttpErrorResponse) {
                            message = error.error.message || error.message;
                        }
                        let alert = await this.alertCtrl.create({
                            header: header,
                            message: message,
                            buttons: [
                                {
                                    text: 'OK'
                                }
                            ]
                        });
                        await alert.present();
                        //logging the http response to browser's console in case of a failuer
                        // if (event instanceof HttpResponse) {
                        //     console.log("api call error :", event);
                        // }
                    }
                ),
                finalize(() => {
                    loading.dismiss();
                })
            ).toPromise();
        }

        return await next.handle(request).toPromise();
    }
}