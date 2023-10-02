import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['../view.scss'],
  standalone: true,
  imports: [ RouterLink ],
})
export class LandingComponent {

}
