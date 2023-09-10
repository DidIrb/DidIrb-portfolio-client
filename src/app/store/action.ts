import { createActionGroup, props } from '@ngrx/store';
import { SigninRequestInterface, RegisterRequestInterface } from '../auth/types/authRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const authActions = createActionGroup({
  // Authentication
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Signin: props<{ request: SigninRequestInterface }>(),
    'Signin success': props<{ currentUser: CurrentUserInterface }>(),
    'Signin failure': props<{ errors: BackendErrorsInterface }>(),
  },

  // Projects

  // Access Control

  // Content

});

