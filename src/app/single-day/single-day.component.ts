import { Component, OnInit } from '@angular/core';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent implements OnInit {
  trackingService: AtlanticCovidTrackingService;
  data$: any;
  selectedDate!: Date | null;

  constructor(trackingService: AtlanticCovidTrackingService) {
    this.trackingService = trackingService;
  }

  ngOnInit() {
  }

  showDailyByDate() {
    this.data$ = this.trackingService.getDailyByDate(this.selectedDate).pipe();
  }

  showDailyByDateOld() {
    this.trackingService.getDailyByDate(this.selectedDate).subscribe((data: any) => {
      this.data$ = data;
      console.log(data);
    });
  }

  onDateChange(e: Date) {
    console.log(e);

    this.selectedDate = e;
    this.showDailyByDate();

  }

}
