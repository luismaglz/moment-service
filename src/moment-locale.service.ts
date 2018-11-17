import { Injectable, InjectionToken, Injector, Optional, Inject } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/es';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_CULTURE_TOKEN = new InjectionToken<string>('DefaultCulture');
const injector = Injector.create({providers: [{provide: DEFAULT_CULTURE_TOKEN, useValue: 'en'}]});

@Injectable({
  providedIn: 'root'
})
export class MomentLocaleService {
  protected locale:string;
  protected momentLocaleData: moment.Locale;

  longDaysOfWeek:BehaviorSubject<string[]>;
  shortDaysOfWeek:BehaviorSubject<string[]>;
  narrowDaysOfWeek:BehaviorSubject<string[]>;
  longMonths:BehaviorSubject<string[]>;
  shortMonths:BehaviorSubject<string[]>;
  
  constructor(@Inject(DEFAULT_CULTURE_TOKEN) protected defaultCulture:string) {
    this.locale = defaultCulture;
    this.momentLocaleData = moment.localeData(defaultCulture);
    this.longDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.months());
    this.shortDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.monthsShort());
    this.narrowDaysOfWeek = new BehaviorSubject<string[]>(this.momentLocaleData.weekdays());
    this.longMonths = new BehaviorSubject<string[]>(this.momentLocaleData.weekdaysShort());
    this.shortMonths = new BehaviorSubject<string[]>(this.momentLocaleData.weekdaysMin());
  }

  /**
   * Retrieve the dates for the days for a given month in a year
   * @param month 
   * @param year 
   */
  public getMonthDates(month:number, year:number): Date[]{
    const properties = {
      year, 
      month, 
      date:2
    }
    const endOfMonth = moment.utc(properties).locale(this.locale).endOf('month').date();
    return this.range(endOfMonth, (i) => this.createDate(year, month, i + 1, this.locale).toDate());
  }


  protected updateDateLabels(locale:string) {
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

  protected createDate(year: number, month: number, date: number, locale: string): Moment {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = moment.utc({ year, month, date }).locale(locale);
    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
}
