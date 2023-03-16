import { AfterViewInit, Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface SingleDayItem {
  title: string;
  total: number;
  change_from_prior_day: number;
  population_percent: number;
  // seven_day_average: number;
  seven_day_change_percent: number;
}

@Component({
  selector: 'app-single-day-table',
  templateUrl: './single-day-table.component.html',
  styleUrls: ['./single-day-table.component.css']
})
export class SingleDayTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'total', 'change_from_prior_day', 'population_percent', 'seven_day_change_percent'];
  items: SingleDayItem[] = [];
  dataSource: MatTableDataSource<SingleDayItem>;

  @Input()
  public get data(): any { return this._data; }
  public set data(data: any) {
    this._data = data;
    if (data) this.populateItems(data);
  }
  private _data = '';

  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {


    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.items);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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

  }
  createItemFromSource(total: any, title: string): SingleDayItem {
    return {
      title: title, total: total.value,
      change_from_prior_day: total.calculated.change_from_prior_day,
      population_percent: total.calculated.population_percent,
      seven_day_change_percent: total.calculated.seven_day_change_percent
    }
  }
}
