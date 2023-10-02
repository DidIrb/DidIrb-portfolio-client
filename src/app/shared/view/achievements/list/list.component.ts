import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectFormsComponent } from 'src/app/admin/components/projects/forms/form.component';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';

import { DataService } from 'src/app/shared/services/data.service';
import { ProjectInterface } from 'src/app/shared/types/Project.interface';
import { State } from 'src/app/shared/types/state.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages, NgIf, ProjectFormsComponent ],
})
export class ListComponent {

  // Getting projects done using ngrx
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

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.currentDate = new Date();
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
        console.log('Making new request for data', postResponse);
      }); 
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

 
  

}
