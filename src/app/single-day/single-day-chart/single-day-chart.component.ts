import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface ChartItem {
  title: string;
  total: number;
  change_from_prior_day: number;
  population_percent: number;
  // seven_day_average: number;
  seven_day_change_percent: number;
}

@Component({
  selector: 'app-single-day-chart',
  templateUrl: './single-day-chart.component.html',
  styleUrls: ['./single-day-chart.component.scss']
})
export class SingleDayChartComponent {

  

  items: ChartItem[] = [];
  dataSource: MatTableDataSource<ChartItem>;
  
  @Input()
  public get data(): any { return this._data; }
  public set data(data: any) {
    this._data = data;
    if (data) this.populateItems(data);
  }
  private _data = '';

  constructor() {


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.items);
  }

  populateItems(inData: any) {

    this.items = [];
    this.items.push(this.createItemFromSource(inData.data.cases.total, 'cases'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.death.total, 'death'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.currently, 'hospitalized'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.in_icu.currently, 'in_icu'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.on_ventilator.currently, 'on_ventilator'));
    this.items.push(this.createItemFromSource(inData.data.testing.total, 'testing'));

    this.dataSource = new MatTableDataSource(this.items);

    console.log('populateItems', this.items);

  }
  createItemFromSource(total: any, title: string): ChartItem {
    return {
      title: title, 
      total: total.value,
      change_from_prior_day: total.calculated.change_from_prior_day,
      population_percent: total.calculated.population_percent,
      seven_day_change_percent: total.calculated.seven_day_change_percent
    }
  }

}
