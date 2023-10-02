import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log("passing data into my request ");

    // clone the request and add withCredentials: true
    const authRequest = request.clone({
      withCredentials: true
    });

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("something wrong with token fix it now...");
          return this.auth.refreshToken0().pipe(
            switchMap((response: HttpResponse<any>) => {
              if (response.status === 200) {
                return next.handle(authRequest);
              } else {
                console.log("logging user out!!!");
                this.auth.logout();
                return throwError(() => error);
              }
            }),
            catchError((refreshError: HttpErrorResponse) => {
              this.auth.logout();
              return throwError(() => refreshError);
            })
          );
        }
  
      return throwError(() => error);
      })
    );
  }
}
