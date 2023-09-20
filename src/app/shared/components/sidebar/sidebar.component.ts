import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RouteList } from '../../types/menu-items';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, NgFor ],
})
export class SidebarComponent {
  public menuItems = RouteList;
  constructor(private authService : AuthService) {}
  logout() {
    this.authService.logout();
  }

}
