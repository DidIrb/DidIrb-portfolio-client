import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { ProjectInterface } from 'src/app/shared/types/Project.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs';
import { AutoGrowDirective } from 'src/app/admin/autogrow.directive';

// import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'mc-project-forms',
  templateUrl: './form.component.html',
  standalone: true,
  styleUrls: ['./form.component.scss'],
  imports: [ ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages, AutoGrowDirective ],
})

export class ProjectFormsComponent {
  editMode: boolean = false;
  value: string = "yes";
  @Input() projectSelect: any | undefined;
  @Output() projectEmitter = new EventEmitter<ProjectInterface>();

  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  repository = new FormControl('', Validators.required);
  visibility = new FormControl('', Validators.required);

  formControls = [this.name, this.description, this.repository, this.visibility];

  constructor(private fb: FormBuilder, private dataService: DataService) {

  }

  ngOnInit() {
    this.toggleEditMode(this.editMode);

    this.name.setValue(this.projectSelect.name);
    this.description.setValue(this.projectSelect.description);
    this.repository.setValue(this.projectSelect.repository);
    this.visibility.setValue(this.projectSelect.visibility);

    this.formControls.forEach((control, index) => {
      control.valueChanges.pipe(
        skip(1), // Skip the first emission
        debounceTime(5000), // delay of 5 seconds
        distinctUntilChanged()
      ).subscribe(val => {
        const controlName = ['name', 'description', 'repository', 'visibility'][index];
        const data = {[controlName]: val};
        this.putData(data, `/project/${this.projectSelect.id}`, 'projectUpdate');
      });
    });
  }

  toggleEditMode(editMode: boolean) {
    this.editMode = editMode;
    this.formControls.forEach(control => {
      if (this.editMode) {
        control.enable();
      } else {
        control.disable();
      }
    });
  }
  
  sendData() {
    this.projectEmitter.emit(undefined);
  }

  async postData(data: any, endpoint: string, stateName: string) {
    try {
      await this.dataService.postData(endpoint, data, stateName);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  async putData(data: any, endpoint: string, stateName: string) {
    try {
      await this.dataService.putData(endpoint, data, stateName);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  
}