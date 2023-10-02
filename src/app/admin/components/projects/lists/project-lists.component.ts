import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { ProjectInterface } from 'src/app/shared/types/Project.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { State } from 'src/app/shared/types/state.interface';
import { ProjectFormsComponent } from '../forms/form.component';

@Component({
  selector: 'mc-project-lists',
  templateUrl: './project-lists.component.html',
  styleUrls: ['./list.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages, NgIf, ProjectFormsComponent ],
  animations: [
    trigger('slideDown', [
      state('void', style({ transform: 'translateY(-100%)' })),
      state('*', style({ transform: 'translateY(0)' })),
      transition(':enter', animate('300ms ease-in')),
      transition(':leave', animate('300ms ease-out')),
    ]),
  ],
})
export class ProjectsComponent {
  currentDate: Date;
  showForm = false;
  endpoint = '/project';
  stateName = 'projects';
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    repository: ['', [Validators.required]],
    visibility: ['', [Validators.required]],
  });
  state: State | undefined;
  projectSelect?: ProjectInterface | undefined;

  constructor(private fb: FormBuilder, private store: Store, private dataService: DataService) {
    this.currentDate = new Date();
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    this.postData(this.form.getRawValue())
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  clearForm() {
    this.form.reset();
  }

  close() {
    this.toggleForm();
    this.clearForm();
  }

  ngOnInit() {
    this.dataService.getState().subscribe(state => {
      this.state = state;
    });
    const response = this.dataService.fetchData(this.endpoint, this.stateName, 0, false);
    console.log(this.state, this.state?.['project']);
  }

  async postData(data: ProjectInterface) {
    try {
      this.dataService.postData(this.endpoint, data, this.stateName)
      .then((postResponse) => {
        this.manageProject(postResponse.body);
        console.log('Making new request for data', postResponse);
      }); 
      this.close();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  manageProject(project?: ProjectInterface) {
    this.projectSelect = project || undefined
    console.log("changing views to manage project", this.projectSelect);
  }
  
  async receiveProject(project: ProjectInterface) {
    this.projectSelect = project;
    const response = await this.dataService.fetchData(this.endpoint, this.stateName, 0, true);
    console.log('updating data fro api', response);
    console.log("received project from child component", this.projectSelect);
  }

}
