import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';



export interface ChartItem {
  name: string;
  value: number;
}

@Component({
    selector: 'app-single-day-chart',
    templateUrl: './single-day-chart.component.html',
    styleUrls: ['./single-day-chart.component.scss'],
    standalone: false
})
export class SingleDayChartComponent {

//chart variables

// single: any[];
// multi: any[];
view: [number, number] = [700, 400];
// options
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = false;
showXAxisLabel = true;
xAxisLabel = 'Category';
showYAxisLabel = true;
yAxisLabel = 'Population';
// colorScheme = {
//   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
// };

colorScheme: Color = {
  name: 'myScheme',
  selectable: true,
  group:  ScaleType.Ordinal,
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

  items: ChartItem[] = [];
  // dataSource: MatTableDataSource<ChartItem>;
  
  @Input()
  public get data(): any { return this._data; }
  public set data(data: any) {
    this._data = data;
    if (data) this.populateItems(data);
  }
  private _data = '';

  @ViewChild('myElement')
  myElement!: ElementRef;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}


  ngAfterViewInit() {
    const width = this.renderer.selectRootElement(this.myElement.nativeElement).offsetWidth;
    console.log('Width:', width);
    this.updateViewWidth(width);
  }
  

  populateItems(inData: any) {

    this.items = [];
    // this.items.push(this.createItemFromSource(inData.data.cases.total, 'cases'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.death.total, 'death'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.currently, 'hospitalized'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.in_icu.currently, 'in ICU'));
    this.items.push(this.createItemFromSource(inData.data.outcomes.hospitalized.on_ventilator.currently, 'on ventilator'));
    // this.items.push(this.createItemFromSource(inData.data.testing.total, 'testing'));

    // this.dataSource = new MatTableDataSource(this.items);

    console.log('chart result ', this.items);

    // Object.assign(this, this.items );


  }

  createItemFromSource(total: any, name: string): ChartItem {
    return {
      name: name, 
      value: total.value
    }
  }

  onSelect(event: any) {
    console.log(event);
  }

  updateViewWidth(newWidth: number) {
    this.view.splice(0, 1, newWidth);
  }

}
