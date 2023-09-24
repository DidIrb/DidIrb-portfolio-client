import { createActionGroup, props } from '@ngrx/store';
import { SigninRequestInterface, RegisterRequestInterface } from '../../auth/types/authRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Signin: props<{ request: SigninRequestInterface }>(),
    'Signin success': props<{ currentUser: CurrentUserInterface }>(),
    'Signin failure': props<{ errors: BackendErrorsInterface }>(),

    Persistence: props<{ userData: CurrentUserInterface }>(),
    'Persistence success': props<{ currentUser: CurrentUserInterface }>(),
    'Persistence failure': props<{ errors: BackendErrorsInterface }>(),
  },

});

// Logout action
// export const logout = createAction('[Auth] Logout');


// Creating an action for 