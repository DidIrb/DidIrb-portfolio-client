import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoute } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/store/auth/reducers';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { TokenInterceptor } from './app/shared/services/http-interceptor.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthEffects } from './app/store/auth/effects';
// adding it my main.ts file

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoute),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    AuthEffects,
    provideEffects([AuthEffects]),
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
