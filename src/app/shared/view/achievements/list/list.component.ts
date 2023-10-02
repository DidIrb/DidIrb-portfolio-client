import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectFormsComponent } from 'src/app/admin/components/projects/forms/form.component';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from 'src/app/shared/services/data.service';
import { State } from 'src/app/shared/types/state.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages, NgIf, ProjectFormsComponent, NgxPaginationModule ],
})

export class ListComponent {

  currentDate: Date;
  endpoint = '/project';
  stateName = 'projects';
  state: State | undefined;
  filteredProjects: any;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.currentDate = new Date();
  }

  // ngOnInit() {
  //   this.dataService.getState().subscribe(state => {
  //     this.state = state;
  //   });
  //   const page = 1; // start from first page
  //   const limit = 10; // number of items per page
  //   const response = this.dataService.fetchData(this.endpoint, this.stateName, page, limit, 0, false);
  //   // const response = this.dataService.fetchData(this.endpoint, this.stateName, 0, false);
  //   console.log(this.state, this.state?.['project']);
  // } 


  p: number = 1;
  // this.searchTerm
  fetchData() {
    const response = this.dataService.fetchData(`${this.endpoint}?name=${this.searchTerm}`, this.stateName, this.p, 10, 0, false);
  }

  ngOnInit() {
    this.dataService.getState().subscribe(state => {
      this.state = state;
      this.filteredProjects = this.state?.['projects'];
    });
    this.fetchData();
  }
  searchTerm: string = '';
  
  onSearchChange(searchValue: any): void { 
    this.searchTerm = searchValue.target.value;
    this.search();
  }
  search() {
    // Filter the existing data and update the state
    this.filteredProjects = this.state?.['projects'].filter((item: { name: string | string[]; }) => item.name.includes(this.searchTerm));

    // If no results, fetch more data
    if (!this.filteredProjects) {
      this.fetchData();
    }
  }
  
}
