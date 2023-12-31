import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { combineLatest } from 'rxjs';
import { selectCurrentUser, selectIsSubmitting, selectValidationErrors } from 'src/app/store/auth/reducers';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    CommonModule, BackendErrorMessages,
  ],
})

export class HomeComponent {

  constructor(private store: Store, private authService: AuthService) {}

  data$ = combineLatest({
    userData: this.store.select(selectCurrentUser),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });
  
  logout() {
    this.authService.logout();
  }

}