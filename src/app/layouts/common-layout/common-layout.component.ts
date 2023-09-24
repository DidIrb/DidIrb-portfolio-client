import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  standalone: true,
  styleUrls: ['./common.scss'],
  imports: [NavbarComponent, RouterOutlet],
})
export class CommonLayoutComponent {
  
}
