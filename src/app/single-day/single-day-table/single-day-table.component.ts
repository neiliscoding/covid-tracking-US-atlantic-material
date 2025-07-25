import { AfterViewInit, Component, Input, ViewChild, OnInit, input, effect, inject, EnvironmentInjector } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

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
    styleUrls: ['./single-day-table.component.css'],
    imports: [MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow]
})
export class SingleDayTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['title', 'total', 'change_from_prior_day', 'population_percent', 'seven_day_change_percent'];
  items: SingleDayItem[] = [];
  dataSource: MatTableDataSource<SingleDayItem>;

  data = input<any>();


  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.items);

    effect(() => {
      const d = this.data();
      if (d) {
        this.populateItems(d);
      }
    });
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

    console.log('populateItems', this.items);

  }
  createItemFromSource(total: any, title: string): SingleDayItem {
    return {
      title: title, 
      total: total.value,
      change_from_prior_day: total.calculated.change_from_prior_day,
      population_percent: total.calculated.population_percent,
      seven_day_change_percent: total.calculated.seven_day_change_percent
    }
  }
}
