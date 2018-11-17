import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, CalendarDayComponent, CalendarMonthComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
