import { Component, OnInit, output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector: 'app-single-day-datepicker',
    templateUrl: './single-day-datepicker.component.html',
    styleUrls: ['./single-day-datepicker.component.css'],
    standalone: false
})
export class SingleDayDatepickerComponent implements OnInit {

  endDate: Date = new Date("2021-03-07");

  dateChange = output<Date>();

  constructor() { }

  ngOnInit() {
  }

  onDateChange(e: MatDatepickerInputEvent<Date>) {
    console.log('onDateChange', e.value);

    if (e.value) this.dateChange.emit(e.value);
  }

}
