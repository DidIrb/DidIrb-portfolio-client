import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigninRequestInterface, RegisterRequestInterface } from '../types/authRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService { 
  constructor(private http: HttpClient) {}

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

}
