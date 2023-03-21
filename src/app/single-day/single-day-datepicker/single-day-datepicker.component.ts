import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-single-day-datepicker',
  templateUrl: './single-day-datepicker.component.html',
  styleUrls: ['./single-day-datepicker.component.css']
})
export class SingleDayDatepickerComponent implements OnInit {

  endDate: Date = new Date("2021-03-07");

  @Output() dateChange = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  onDateChange(e: MatDatepickerInputEvent<Date>) {
    console.log(e.value);

    if (e.value) this.dateChange.emit(e.value);
  }

}
