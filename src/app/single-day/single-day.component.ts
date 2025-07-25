import { Component, effect, inject, signal } from '@angular/core';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';
import { SingleDayChartComponent } from './single-day-chart/single-day-chart.component';
import { SingleDayDatepickerComponent } from './single-day-datepicker/single-day-datepicker.component';
import { SingleDayTableComponent } from './single-day-table/single-day-table.component';

@Component({
    selector: 'app-single-day',
    templateUrl: './single-day.component.html',
    styleUrls: ['./single-day.component.css'],
    imports: [SingleDayDatepickerComponent, SingleDayChartComponent, SingleDayTableComponent]
})
export class SingleDayComponent {

  selectedDate = signal<Date | null>(null);
  data = signal<CovidData>({} as CovidData);

  #trackingService = inject(AtlanticCovidTrackingService);

  constructor() {

    effect(() => {
      const date = this.selectedDate();
      if (date) {
        this.#trackingService.getDailyByDateObservable(date).subscribe(data => {
          this.data.set(data);
        });
      }
    });
  }

  onDateChange(e: Date) {
    this.selectedDate.set(e);
  }

}
