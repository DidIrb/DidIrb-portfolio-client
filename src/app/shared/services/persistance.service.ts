import { Injectable } from '@angular/core';
import { CurrentUserInterface } from '../types/currentUser.interface';

@Injectable({ providedIn: 'root' })
export class PersistanceService {

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('error saving to local storage', e);
    }
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('error getting from local storage', e);
      return null;
    }
  }

}
