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
import { AuthEffects } from './app/store/auth/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './app/shared/services/http-interceptor.service';
// adding it my main.ts file

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoute),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    AuthEffects,
    provideEffects([AuthEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
