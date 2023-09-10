import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-project-lists',
  templateUrl: './project-lists.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})

export class ProjectsComponent {
  // GETTING LIST OF PROJECT
  constructor(private fb: FormBuilder, private store: Store) {}

}

// THIS IS SUPPOSED TO BE VIEWED BY MULTIPLE PEOPLE