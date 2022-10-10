import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AppUtils } from "./cms.util";
import { AuthService } from "./jj-luckydraw/auth.service";
import { SwsErpService } from "./sws-erp.service";

@Injectable()
export class SwsErpInterceptor implements HttpInterceptor {

    constructor(private app: AppUtils, private erp: SwsErpService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler) {
        let apiUrl = environment.swsErp.apiUrl;
        if (request.url.substring(0, apiUrl.length) === apiUrl) {
            await this.app.presentLoading();

            let updatedRequest = request.clone(request);
            if (!request.headers.get("Authorization") && this.erp.TOKEN) {
                updatedRequest = updatedRequest.clone({
                    setHeaders: { Authorization: `Bearer ${this.erp.TOKEN}` }
                })
            }

            console.log("Before making api call : ", updatedRequest);
            return next.handle(updatedRequest).pipe(
                tap(
                    (event) => {
                        if (event instanceof HttpResponse) {
                            console.log("api call success :", event);
                        }
                    },
                    (error) => {
                        console.error("api call error :", error);
                        let header = "_UNKNOWN_ERROR";
                        let message = "_UNKNOWN_ERROR";
                        if (error instanceof HttpErrorResponse) {
                            message = error.error.message || error.message;
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
