import { Component, OnInit } from '@angular/core';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent implements OnInit {
  trackingService: AtlanticCovidTrackingService;
  data: any;

  constructor(trackingService: AtlanticCovidTrackingService) {
    this.trackingService = trackingService;
  }

  ngOnInit() {
    this.showDailyByDate();
  }

  showDailyByDate() {
    this.trackingService.getDailyByDate().subscribe((data: any) => {
      this.data = data;
      console.log(data);
    });
  }

}
