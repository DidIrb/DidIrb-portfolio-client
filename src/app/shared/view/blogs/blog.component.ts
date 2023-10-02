import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['../view.scss'],
  standalone: true,
})
export class BlogsComponent {
  currentDate: any;

  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
  }
}
