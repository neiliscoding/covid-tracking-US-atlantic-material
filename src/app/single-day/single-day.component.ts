import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';
import { SingleDayDatepickerComponent } from './single-day-datepicker/single-day-datepicker.component';
import { SingleDayChartComponent } from './single-day-chart/single-day-chart.component';
import { SingleDayTableComponent } from './single-day-table/single-day-table.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-single-day',
    templateUrl: './single-day.component.html',
    styleUrls: ['./single-day.component.css'],
    imports: [SingleDayDatepickerComponent, SingleDayChartComponent, SingleDayTableComponent, AsyncPipe]
})
export class SingleDayComponent {
  data$!: Observable<CovidData>;
  selectedDate!: Date | null;
  #trackingService = inject(AtlanticCovidTrackingService);
  dailySignal: any;
  injector = inject(EnvironmentInjector);

/*

  constructor() {

    effect(() => {

    });
  }
*/

  showDailyByDate() {
    this.data$ = this.#trackingService.getDailyByDateObservable(this.selectedDate);
    // this.dailySignal = this.#trackingService.getDailyByDateSignal(this.selectedDate, this.injector);
  }

  onDateChange(e: Date) {
    this.selectedDate = e;
    this.showDailyByDate();
  }

}
