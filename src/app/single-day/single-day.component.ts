import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CovidData } from '../shared/interfaces/CovidData';
import { AtlanticCovidTrackingService } from '../shared/services/atlantic-covid-tracking.service';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css']
})
export class SingleDayComponent implements OnInit {
  data$!: Observable<CovidData>;
  selectedDate!: Date | null;

  constructor(private trackingService: AtlanticCovidTrackingService) {
    this.trackingService = trackingService;
  }

  ngOnInit() {

    // this.data$?.subscribe((data: any) => {
    //   console.log(data);
    // });
  }

  // ngAfterViewInit() {
  //   this.data$?.subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }

  showDailyByDate() {
    this.data$ = this.trackingService.getDailyByDate(this.selectedDate);
    this.data$?.subscribe((data: any) => {
      console.log(data);
    });
  }

  showDailyByDateOld() {
    this.trackingService.getDailyByDate(this.selectedDate).subscribe((data: any) => {
      this.data$ = data;
      console.log(data);
    });
  }

  onDateChange(e: Date) {

    this.selectedDate = e;
    this.showDailyByDate();
    // this.showDailyByDateOld();

  }

}
