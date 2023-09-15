import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninRequestInterface, RegisterRequestInterface } from './types/authRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from './types/authResponse.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService { 

  constructor(private http: HttpClient, private router: Router) {}

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
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.data));
  }

  // Refreshing Token

  refreshToken() {
    const url = environment.apiUrl + '/token';
    return this.http.post(url, {}, { observe: 'response' });
  }

  logout() {
    const url = environment.apiUrl + '/logout';
    return this.http.post(url, {}, { observe: 'response' }).subscribe(
      () => {
        // Clear user from localStorage and navigate to the sign in page
        localStorage.removeItem("userDetails");
        this.router.navigate(['auth/signin']);
      },
      (error) => {
        console.error('Error logging out', error);
      }
    );
  }
  
}
