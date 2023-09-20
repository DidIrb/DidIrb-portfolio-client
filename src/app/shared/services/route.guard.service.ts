import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { authActions } from 'src/app/store/auth/action';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/store/auth/reducers';

@Injectable({ providedIn: 'root' })
class PermissionsService {
  constructor( private router: Router, private store: Store) {}

  async canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('checking if user data exists');

    // Activate route if there is userDetails is available in localStorage
    const data = localStorage.getItem('data');
    if (data) {
      const user: any = await JSON.parse(data);
      this.store.select(selectCurrentUser).subscribe(currentUser => {
        if (!currentUser) {
          if(user){
            console.log('User details does not exist so we are persisting users data');
            this.store.dispatch(authActions.persistence(user));
          } else {
            console.log('No data to persist, logging you out');
            this.router.navigate(['auth/signin']);
          }
          // Check if there is data in localStorage before persis
        } else {
          console.log('User details exist');
        }
      });
      return true;
    }
      
    this.router.navigate(['auth/signin']);
    return false;
    
  }

}


export const AuthGuard: CanActivateFn = async ( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  return await inject(PermissionsService).canActivate(next, state);
};


