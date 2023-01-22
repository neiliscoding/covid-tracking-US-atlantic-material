import { AfterViewInit, Component, Input, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

export interface SingleDayItem {
  title: string;
  total: number;
  change_from_prior_day: number;
  population_percent: number;
  // seven_day_average: number;
  seven_day_change_percent: number;
}

/** Constants used to fill up our data base. */
// const FRUITS: string[] = [
//   'blueberry',
//   'lychee',
//   'kiwi',
//   'mango',
//   'peach',
//   'lime',
//   'pomegranate',
//   'pineapple',
// ];
// const NAMES: string[] = [
//   'Maia',
//   'Asher',
//   'Olivia',
//   'Atticus',
//   'Amelia',
//   'Jack',
//   'Charlotte',
//   'Theodore',
//   'Isla',
//   'Oliver',
//   'Isabella',
//   'Jasper',
//   'Cora',
//   'Levi',
//   'Violet',
//   'Arthur',
//   'Mia',
//   'Thomas',
//   'Elizabeth',
// ];

@Component({
  selector: 'app-single-day-table',
  templateUrl: './single-day-table.component.html',
  styleUrls: ['./single-day-table.component.css']
})
export class SingleDayTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'total', 'change_from_prior_day', 'population_percent', 'seven_day_change_percent'];
  items!: SingleDayItem[];
  dataSource: MatTableDataSource<SingleDayItem>;

  // @Input() data: any = {};

  @Input()
  public get data(): any { return this._data; }
  public set data(data: any) {
    this._data = data;
    this.populateItems(data);
  }
  private _data = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // this.data

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.items);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  populateItems(inData: any) {

    const cases = inData.data.cases;

    this.items.push(this.createItemFromSource(cases.total, 'cases'));

    this.dataSource = new MatTableDataSource(this.items);
  }
  createItemFromSource(total: any, title: string): SingleDayItem {
    return {
      title: title, total: total.value,
      change_from_prior_day: total.calculated.change_from_prior_day,
      population_percent: total.calculated.population_percent,
      seven_day_change_percent: total.seven_day_change_percent
    }
  }



}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
