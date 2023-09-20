import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninRequestInterface, RegisterRequestInterface } from './types/authRequest.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from './types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../store/auth/action';

@Injectable({ providedIn: 'root' })
export class AuthService { 

  constructor(private http: HttpClient, private router: Router, private store: Store) {}
  userDetails : any;
  
  // REGISTER
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/signup';
    console.log(url)
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.data));
  }
  
  // SIGN IN
  signin(data: SigninRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/signin';
    console.log(url)
    return this.http
      .post<AuthResponseInterface>(url, data, { withCredentials: true })
      .pipe(map((response) => response.data));
  }

  logout(): Observable<string> {
    const url = environment.apiUrl + '/auth/logout';
    console.log(url)
    return this.http
      .post(url, {}, { responseType: 'text', withCredentials: true });
  }

  // isLoggedIn = new BehaviorSubject<boolean>(false);

  // checkLoginStatus() {
  //   console.log("checking login status")
  //   const data = localStorage.getItem('data');
  //   if (data) {
  //     // this.userDetails = await JSON.parse(data);
  //     // Update isLoggedIn BehaviorSubject
  //     return true;
  //   } else {
  //     // Update isLoggedIn BehaviorSubject
  //     return false
  //   }
  // }

  // Refreshing Token

  refreshToken() {
    const url = environment.apiUrl + '/token';
    return this.http.post(url, {}, { observe: 'response' });
  }

  // logout() {
  //   const url = environment.apiUrl + '/auth/logout';
  //   localStorage.removeItem("data");
  //   return this.http.post(url, {}, { observe: 'response', withCredentials: true }).subscribe({
  //       next: (response) => {
  //         // this.checkLoginStatus();
  //         this.store.dispatch(authActions.logout({ payload: null }));
  //         console.log("this was the response", response)
  //       },
  //       error: (error) => {
  //         console.error('Error logging out', error);
  //       }
  //     }
  //   );
  
  // }
  
  
}
