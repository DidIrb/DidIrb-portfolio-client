import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, NavbarComponent]
})
export class AdminLayoutComponent {

}
