import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.auth.refreshToken().pipe(
            switchMap((response: HttpResponse<any>) => {
              if (response.status === 200) {
                return next.handle(request);
              } else {
                this.auth.logout();
                return throwError(() => error);
              }
            }),
            catchError((refreshError: HttpErrorResponse) => {
              this.auth.logout();
              this.router.navigate(['auth/signin']);
              return throwError(() => refreshError);
            })
          );
        }
  
      return throwError(() => error);
      })
    );
  }
  
}
