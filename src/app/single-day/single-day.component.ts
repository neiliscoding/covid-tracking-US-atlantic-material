import { Component, computed, createEnvironmentInjector, EnvironmentInjector, inject, resource, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';
import { SingleDayDatepickerComponent } from './single-day-datepicker/single-day-datepicker.component';
import { SingleDayChartComponent } from './single-day-chart/single-day-chart.component';
import { SingleDayTableComponent } from './single-day-table/single-day-table.component';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-single-day',
    templateUrl: './single-day.component.html',
    styleUrls: ['./single-day.component.css'],
    imports: [SingleDayDatepickerComponent, SingleDayChartComponent, SingleDayTableComponent, AsyncPipe]
})
export class SingleDayComponent {
  data$!: Observable<CovidData>;
  // selectedDate!: Date | null;
    // Signal for selected date
  selectedDate = signal<Date | null>(null);
  // data = computed(() => {
  //   const date = this.selectedDate();
  //   if (!date) return {} as CovidData;
    
  //   return this.#trackingService.getDailyByDateSignal(date);
  // });

  data = resource({
    params: () => ({
      date: this.selectedDate()}),
    loader: ({ params }) => { // Destructure params
      if (!params.date) return Promise.resolve({} as CovidData);
      return this.#trackingService.getDailyByDateObservable(params.date).toPromise();
    }
  });

  #trackingService = inject(AtlanticCovidTrackingService);
  // #parentInjector = inject(EnvironmentInjector);
  // injector = createEnvironmentInjector(
  //   [DatePipe],
  //   this.#parentInjector
  // );
  // dailySignal: any;

  // showDailyByDate() {
  //   this.data$ = this.#trackingService.getDailyByDateObservable(this.selectedDate);
  //   // this.dailySignal = this.#trackingService.getDailyByDateSignal(this.selectedDate, this.injector);
  // }

  onDateChange(e: Date) {
    this.selectedDate.set(e);
  }

}
