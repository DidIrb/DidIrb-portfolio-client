import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { authActions } from './action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  registerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log(currentUser);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse)
            return of(
              authActions.registerFailure({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterRegisterEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        this.router.navigateByUrl('/auth/signin')
      })
    ), { dispatch: false }
  )

  signInEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signin),
      switchMap(({ request }) => {
        return this.authService.signin(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log(currentUser);
            this.persistanceService.set('data', currentUser);
            return authActions.signinSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.signinFailure({
                errors: errorResponse.error,
              })
            );
          })
        );
      })
    )
  );

  redirectAfterSignInEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signinSuccess),
      tap(() => {
        this.router.navigateByUrl('/administrator/home')
      })
    ), { dispatch: false }
  )

  persistanceEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.persistence),
      map(() => {
        const userData: any = this.persistanceService.get('data');
        if (userData) {
          console.log(userData)
          return authActions.persistenceSuccess({currentUser: userData});
        } else {
          const error: any = "Details not found"
          return authActions.persistenceFailure({ errors: error });
        }
      }),
      catchError(() => of(authActions.persistenceFailure({ 
        errors: { localStorageError: ["Error occurred while getting user data from localStorage"] 
      }})))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
