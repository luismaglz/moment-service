import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarDayComponent implements OnInit {

  constructor() { }

  datafield1:string|number = '';
  datafield2:string|number = '';
  datafield3:string|number = '';

  ngOnInit() {
  }

}