import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarMonthComponent implements OnInit {
  month: number = 9;
  year: number = 2018;
  constructor() { }

  ngOnInit() {
    this.setLocale('es');
  }

  localeData: {
    firstDayOfWeek: number,
    longMonths: string[],
    shortMonths: string[],
    dates: string[],
    longDaysOfWeek: string[],
    shortDaysOfWeek: string[],
    narrowDaysOfWeek: string[]
  };

  setLocale(locale: string) {
    let momentLocaleData = moment.localeData(locale);
    const properties = {
      year:this.year, 
      month:this.month, 
      date:1
    }
    const endOfMonth = moment.utc(properties).locale(locale).endOf('month').date();
    this.localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: this.range(endOfMonth, (i) => this.createDate(this.year, this.month, i + 1, locale).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  /** Creates an array and fills it with values. */
  range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
      valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
  }

  createDate(year: number, month: number, date: number, locale:string): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = moment.utc({year, month, date}).locale(locale);
    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
}