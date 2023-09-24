import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Store } from '@ngrx/store';
import { CommonModule, NgIf } from '@angular/common';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import { DataService } from 'src/app/shared/services/data.service';
import { State } from 'src/app/shared/types/state.interface';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NgIf,
    CommonModule,
    BackendErrorMessages,
  ],
  animations: [
    trigger('Message', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class AdminLayoutComponent {
  state: State | undefined;
  errorMessage: any;
  successMessage: string | null | undefined;
  constructor(private dataService: DataService) {}

  // In your component
  ngOnInit() {
    this.dataService.getState().subscribe(state => {
      this.state = state;
      this.errorMessage = state.error;
      this.successMessage = state.successMessage;
      // Clear the error message after 5 seconds
      setTimeout(() => {
        this.errorMessage = null;
        this.successMessage = null
      }, 5000);
    });
  }

}
