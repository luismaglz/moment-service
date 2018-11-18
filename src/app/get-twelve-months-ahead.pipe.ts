import { Pipe, PipeTransform } from '@angular/core';
import { MomentLocaleService } from './moment-locale.service';

@Pipe({
  name: 'getTwelveMonthsAhead'
})
export class GetTwelveMonthsAheadPipe implements PipeTransform {

  constructor(protected momentLocaleService: MomentLocaleService){

  }
  transform(date: Date): Date[] {
    return this.momentLocaleService.getMonthsAhead(date.getMonth(), date.getFullYear(), 12);
  }
}
