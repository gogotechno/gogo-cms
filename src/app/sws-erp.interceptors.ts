import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUtils } from './cms.util';
import { SwsErpService } from './sws-erp.service';

@Injectable()
export class SwsErpInterceptor implements HttpInterceptor {
  constructor(private app: AppUtils, private erp: SwsErpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    let apiUrl = environment.swsErp.apiUrl;
    if (request.url.substring(0, apiUrl.length) === apiUrl) {
      // await this.app.presentLoading();
      this.app.requestChange.next(1);

      let updatedRequest = request.clone({
        setParams: { lang: this.erp.language },
      });

      if (!request.headers.get('Authorization') && this.erp.token) {
        updatedRequest = updatedRequest.clone({
          setHeaders: { Authorization: `Bearer ${this.erp.token}` },
        });
      }

      console.log('Before making api call : ', updatedRequest);

      return next
        .handle(updatedRequest)
        .pipe(
          tap(
            (next) => {
              if (next instanceof HttpResponse) {
                console.log('api call success :', next);
              }
            },
            async (err) => {
              console.error('api call error :', err);
              let header = '_ERROR';
              let message = '_UNKNOWN_ERROR';
              if (err instanceof HttpErrorResponse) {
                message = err.error.message || err.error.error || err.message;
              }
              if (this.isRefreshTokenExpiredError(err) || this.isWrongAuthTokenError(err)) {
                message = '_YOUR_CREDENTIAL_IS_EXPIRED';
                this.erp.signOut();
              }
              if (this.isUserNotFoundError(err)) {
                message = '_YOUR_CREDENTIAL_IS_INVALID';
                this.erp.signOut();
              }
              if (!this.isAccessTokenExpiredError(err)) {
                await this.app.presentAlert(message, header);
              }
            },
          ),
          catchError((err) => {
            if (this.isAccessTokenExpiredError(err)) {
              return from(this.handleExpiredAccessToken(updatedRequest, next));
            }
            return throwError(err);
          }),
          finalize(async () => {
            // await this.app.dismissLoading();
            this.app.requestChange.next(-1);
          }),
        )
        .toPromise();
    }

    return await next.handle(request).toPromise();
  }

  private isAccessTokenExpiredError(err: any) {
    return err instanceof HttpErrorResponse && err.status == 401 && err.error?.message?.startsWith('Token Expired');
  }

  private isRefreshTokenExpiredError(err: any) {
    return err instanceof HttpErrorResponse && err.status == 500 && err.error?.error?.startsWith('jwt expired');
  }

  private isWrongAuthTokenError(err: any) {
    return (
      err instanceof HttpErrorResponse &&
      err.status == 401 &&
      err.error?.message?.startsWith('Wrong authentication token')
    );
  }

  private isUserNotFoundError(err: any) {
    let isUserNotFoundMessage: boolean = false;
    if (err.error?.error) {
      isUserNotFoundMessage = err.error.error.startsWith('User not found');
    }
    if (err.error?.message) {
      isUserNotFoundMessage = err.error.message.startsWith('User not found');
    }
    return err instanceof HttpErrorResponse && err.status == 409 && isUserNotFoundMessage;
  }

  private async handleExpiredAccessToken(request: HttpRequest<any>, next: HttpHandler) {
    await this.erp.generateAccessToken(this.erp.refreshToken);
    let updatedRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${this.erp.token}` },
    });
    return next.handle(updatedRequest).toPromise();
  }
}
