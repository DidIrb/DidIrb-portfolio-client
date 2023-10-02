import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninRequestInterface, RegisterRequestInterface } from './types/authRequest.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from './types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

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

  // logout(): Observable<string> {
  //   const url = environment.apiUrl + '/auth/logout';
  //   console.log(url)
  //   return this.http
  //     .post(url, {}, { responseType: 'text', withCredentials: true });
  // }

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
    return this.http.post(url, {}, { withCredentials: true });
  }
  refreshToken0() {
    const url = environment.apiUrl + '/token';
    return this.http.post(url, {}, {observe: 'response', withCredentials: true });
  }

  logout() {
    const url = environment.apiUrl + '/auth/logout';
    return this.http.post(url, {}, { observe: 'response', withCredentials: true }).subscribe({
      next: (response) => {
          // this.checkLoginStatus();
          console.log("this was the response, so we will remove users Data", response)
          // Refresh to remove users data
          localStorage.removeItem("data");
          window.location.reload();
        },
        error: (error) => {
          console.error('Error logging out', error);
        }
      }
    );
  
  }
  
  
}
