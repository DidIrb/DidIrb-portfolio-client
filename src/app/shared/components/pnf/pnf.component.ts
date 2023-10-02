import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pnf',
  templateUrl: './pnf.component.html',
  styleUrls: ['./pnf.component.scss']
})
export class PNFComponent {
  constructor(private location: Location) { }

  goBack() {
    this.location.back(); // navigate back to the previous page
  }
}
