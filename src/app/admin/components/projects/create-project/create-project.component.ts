import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-create-project',
  templateUrl: './create-project.component.html',
  standalone: true,
  styleUrls: ['./create-project.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})

export class ProjectFormsComponent {
  // Form to create project
  constructor(private fb: FormBuilder, private store: Store) {}
  

}