import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';

@Component({
    selector: 'app-single-day',
    templateUrl: './single-day.component.html',
    styleUrls: ['./single-day.component.css'],
    standalone: false
})
export class SingleDayComponent {
  data$!: Observable<CovidData>;
  selectedDate!: Date | null;
  #trackingService = inject(AtlanticCovidTrackingService);
  dailySignal: any;


  showDailyByDate() {
    this.data$ = this.#trackingService.getDailyByDateObservable(this.selectedDate);
    // this.dailySignal = this.#trackingService.getDailyByDateSignal(this.selectedDate);
  }

  onDateChange(e: Date) {
    this.selectedDate = e;
    this.showDailyByDate();
  }

}
