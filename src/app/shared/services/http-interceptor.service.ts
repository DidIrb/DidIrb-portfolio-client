import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/action';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router, private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("something wrong with token fix it now...");
          return this.auth.refreshToken().pipe(
            switchMap((response: HttpResponse<any>) => {
              if (response.status === 200) {
                return next.handle(request);
              } else {
                console.log("logging user out!!!");
                this.store.dispatch(authActions.logout({payload: null}));
                return throwError(() => error);
              }
            }),
            catchError((refreshError: HttpErrorResponse) => {
              this.store.dispatch(authActions.logout({payload: null}));
              return throwError(() => refreshError);
            })
          );
        }
  
      return throwError(() => error);
      })
    );
  }
  
}
