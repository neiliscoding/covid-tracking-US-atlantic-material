import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent {
  data$!: Observable<CovidData>;
  selectedDate!: Date | null;

  constructor(private trackingService: AtlanticCovidTrackingService) {
    this.trackingService = trackingService;
  }

  showDailyByDate() {
    this.data$ = this.trackingService.getDailyByDate(this.selectedDate);
    // this.data$?.subscribe((data: any) => {
    //   console.log('showDailyByDate' + data);
    // });
  }

  onDateChange(e: Date) {
    this.selectedDate = e;
    this.showDailyByDate();
  }

}
