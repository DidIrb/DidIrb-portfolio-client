import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { State } from '../types/state.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private _state: BehaviorSubject<State> = new BehaviorSubject<State>({ isLoading: false, error: null, successMessage: null });

  constructor(private http: HttpClient, public auth: AuthService) {}

  getState(): Observable<State> {
    return this._state.asObservable();
  }

  async fetchData(endpoint: string, stateName: string, retryCount = 0, forceFetch = false): Promise<void> {
    if (!forceFetch && this._state.value[stateName]) {
      return;
    }
  
    this._state.next({ ...this._state.value, isLoading: true });
  
    try {
      const data = await this.makeRequest('get', endpoint);
      console.log("making request", data)
      this.updateState(stateName, data);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401 && retryCount < 3) {
        await this.handleUnauthorizedError('get', endpoint, stateName, retryCount);
      } else {
        this.handleError(error);
      }
    }
  }
  

  async postData(endpoint: string, data: any, stateName: string, retryCount = 0): Promise<any> {
    this._state.next({ ...this._state.value, isLoading: true });

    try {
      const responseData = await this.makeRequest('post', endpoint, data);
      this._state.next({ ...this._state.value, isLoading: false, successMessage: responseData.message });
      return responseData;
      // this.updateState(stateName, responseData);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401 && retryCount < 3) {
        await this.handleUnauthorizedError('post', endpoint, stateName, retryCount, data);
      } else {
        this.handleError(error);
      }
    }
  }

  async putData(endpoint: string, data: any, stateName: string, retryCount = 0): Promise<void> {
    this._state.next({ ...this._state.value, isLoading: true });

    try {
      const responseData = await this.makeRequest('put', endpoint, data);
      this.updateState(stateName, responseData);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401 && retryCount < 3) {
        await this.handleUnauthorizedError('put', endpoint, stateName, retryCount, data);
      } else {
        this.handleError(error);
      }
    }
  }

  async makeRequest(method: string, endpoint: string, data?: any): Promise<any> {
    const url = environment.apiUrl + endpoint;
    if (method === 'get') {
      return firstValueFrom(this.http.get(url, { withCredentials: true }));
    } else if (method === 'post') {
      return firstValueFrom(this.http.post(url, data, { withCredentials: true }));
    } else if (method === 'put') {
      return firstValueFrom(this.http.put(url, data, { withCredentials: true }));
    }
  }

  updateState(stateName: string, data: any): void {
    this._state.next({ ...this._state.value, isLoading: false, successMessage: data.message, [stateName]: data.body });
    console.log("updated state", this._state.value);
    // Clear the success and error messages after 5 seconds
    setTimeout(() => {
      this._state.next({ ...this._state.value, successMessage: null, error: null });
    }, 3000);
  }

  async handleUnauthorizedError(method: string, endpoint: string, stateName: string,
                                retryCount: number, data?: any): Promise<void> {
    try {
      const response = await firstValueFrom(this.auth.refreshToken()) as Response;
      if (response.status === 200) {
        if (method === 'get') {
          await this.fetchData(endpoint, stateName, retryCount + 1);
        } else if (method === 'post') {
          await this.postData(endpoint, data ,stateName, retryCount +1)
        } else if (method === 'put') {
          await this.putData(endpoint,data,stateName,retryCount +1)
        }
        
      }
    } catch (refreshError) {
      if (refreshError instanceof HttpErrorResponse) {
        // this.auth.logout();
        console.log("error", refreshError)
        throw refreshError;
      }
    }
  }

 handleError(error: any): void{
   console.log("something is not working as expected", error)
   this._state.next({ ...this._state.value ,isLoading:false, error: error.error.message });
   throw error
 }
}


// setTimeout(() => {
//   console.log("something happened");
//   this._state.next({ ...this._state.value, isLoading: false, error: "something went wrong" });
// }, 3000);