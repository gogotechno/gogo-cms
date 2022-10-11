import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, from, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AppUtils } from "./cms.util";
import { SwsErpService } from "./sws-erp.service";

@Injectable()
export class SwsErpInterceptor implements HttpInterceptor {

    constructor(private app: AppUtils, private translate: TranslateService, private erp: SwsErpService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler) {
        let apiUrl = environment.swsErp.apiUrl;
        if (request.url.substring(0, apiUrl.length) === apiUrl) {
            await this.app.presentLoading();

            let updatedRequest = request.clone(request);
            updatedRequest = updatedRequest.clone({
                setParams: { lang: this.translate.currentLang }
            })

            if (!request.headers.get("Authorization") && this.erp.token) {
                updatedRequest = updatedRequest.clone({
                    setHeaders: { Authorization: `Bearer ${this.erp.token}` }
                })
            }

            console.log("Before making api call : ", updatedRequest);
            return next.handle(updatedRequest).pipe(
                tap(
                    (next) => {
                        if (next instanceof HttpResponse) {
                            console.log("api call success :", next);
                        }
                    },
                    (err) => {
                        console.error("api call error :", err);
                        let header = "_ERROR";
                        let message = "_UNKNOWN_ERROR";
                        if (err instanceof HttpErrorResponse) {
                            message = err.error.message || err.error.error || err.message;
                        }

                        this.app.presentAlert(message, header);
                    }
                ),
                catchError((err) => {
                    //todo: refresh access token
                    return throwError(err);
                }),
                finalize(() => {
                    this.app.dismissLoading();
                })
            ).toPromise();
        }

        return await next.handle(request).toPromise();
    }


}
