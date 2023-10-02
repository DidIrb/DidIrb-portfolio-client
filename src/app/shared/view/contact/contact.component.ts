import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../view.scss', './contact.scss'],
  standalone: true,
})
export class ContactsComponent {
  currentDate: any;

  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
  }
}
