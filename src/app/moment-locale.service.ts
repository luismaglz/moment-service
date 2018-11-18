import { Injectable, InjectionToken, Injector, Optional, Inject } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/es';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MomentLocaleService {
  protected locale:string;
  protected momentLocaleData: moment.Locale;
  protected defaultCulture: string = 'en';

  longDaysOfWeek:BehaviorSubject<string[]>;
  shortDaysOfWeek:BehaviorSubject<string[]>;
  narrowDaysOfWeek:BehaviorSubject<string[]>;
  longMonths:BehaviorSubject<string[]>;
  shortMonths:BehaviorSubject<string[]>;
  
  constructor() {
    this.locale = this.defaultCulture;
    this.momentLocaleData = moment.localeData(this.defaultCulture);
    this.longDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.weekdays());
    this.shortDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.weekdaysShort());
    this.narrowDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.weekdaysMin());
    this.longMonths = new BehaviorSubject<string[]>(this.momentLocaleData.months());
    this.shortMonths = new BehaviorSubject<string[]>(this.momentLocaleData.monthsShort());
  }

  /**
   * Retrieve the dates for the days for a given month in a year
   * @param month 
   * @param year 
   */
  public getMonthDates(month:number, year:number): Date[]{
    const properties = {
      year, 
      month
    }
    const endOfMonth = moment(properties).locale(this.locale).endOf('month').date();
    const dates = [];
    for(let day = 1; day <= endOfMonth; day++){
      dates.push(new Date(year, month, day))
    }
    return dates;
  }

  public getMonthWeeks(month:number, year:number): Date[][]{
    const weeks = [];
    this.getMonthDates(month, year).reduce((week, day, index, array) => {
      week.push(day);

      if(day.getDay() === 6 || index === array.length - 1){
        weeks.push(week);
        return [];
      }
      return week;
    }, [])
    return weeks;
  };

  public getMonthsAhead(month: number, year:number, numberOfMonths: number): Date[]{
    const months = [];
    for(let x = 0; x < numberOfMonths; x++){
      const date = new Date(year, month, 2);
      date.setMonth(date.getMonth() + x);
      months.push(date);
    }
    return months;
  }

  protected updateDateLabels() {
    this.longMonths.next(this.momentLocaleData.months());
    this.shortMonths.next(this.momentLocaleData.monthsShort());
    this.longDaysOfWeek.next(this.momentLocaleData.weekdays());
    this.shortDaysOfWeek.next(this.momentLocaleData.weekdaysShort());
    this.narrowDaysOfWeek.next(this.momentLocaleData.weekdaysMin());
  }

  /** Creates an array and fills it with values. */
  protected range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
      valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
  }
}
