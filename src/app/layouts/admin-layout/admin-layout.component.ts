import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.scss'],
    standalone: true,
    imports: [RouterOutlet, SidebarComponent]
})
export class AdminLayoutComponent {

}
