import { Pipe, PipeTransform } from '@angular/core';
import { MomentLocaleService } from './moment-locale.service';

@Pipe({
  name: 'getMonthWeeks'
})
export class GetMonthWeeksPipe implements PipeTransform {

  constructor(protected momentLocaleService: MomentLocaleService){

  }
  transform(date: Date): Date[][] {
    return this.momentLocaleService.getMonthWeeks(date.getMonth(), date.getFullYear());
  }

}
