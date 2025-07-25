import { Component, output } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-single-day-datepicker',
    templateUrl: './single-day-datepicker.component.html',
    styleUrls: ['./single-day-datepicker.component.css'],
    imports: [MatFormField, MatLabel, MatInput, MatDatepickerInput, MatHint, MatDatepickerToggle, MatSuffix, MatDatepicker]
})
export class SingleDayDatepickerComponent {

  endDate: Date = new Date("2021-03-07");

  dateChange = output<Date>();

  onDateChange(e: MatDatepickerInputEvent<Date>) {
    console.log('onDateChange', e.value);

    if (e.value) this.dateChange.emit(e.value);
  }

}
