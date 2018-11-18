import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { GetMonthWeeksPipe } from './get-month-weeks.pipe';
import { GetTwelveMonthsAheadPipe } from './get-twelve-months-ahead.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, CalendarDayComponent, CalendarMonthComponent, GetMonthWeeksPipe, GetTwelveMonthsAheadPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
