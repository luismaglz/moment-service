import { Component } from '@angular/core';
import { MomentLocaleService } from './moment-locale.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor(protected momentLocaleService: MomentLocaleService){
    (window as any).momentLocaleService = momentLocaleService;
  }
}
