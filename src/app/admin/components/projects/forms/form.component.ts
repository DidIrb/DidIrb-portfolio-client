import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { ProjectInterface } from 'src/app/shared/types/Project.interface';

@Component({
  selector: 'mc-project-forms',
  templateUrl: './form.component.html',
  standalone: true,
  styleUrls: ['./form.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})

export class ProjectFormsComponent {
  // GETTING LIST OF PROJECT
  editMode: boolean = false;
  constructor(private fb: FormBuilder, private store: Store) {}

  @Input() projectSelect: ProjectInterface | undefined;
  @Output() projectEmitter = new EventEmitter<ProjectInterface>();

  sendData() {
    this.projectEmitter.emit(undefined);
  }
}