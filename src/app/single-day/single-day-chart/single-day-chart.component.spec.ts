import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDayChartComponent } from './single-day-chart.component';

describe('SingleDayChartComponent', () => {
  let component: SingleDayChartComponent;
  let fixture: ComponentFixture<SingleDayChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SingleDayChartComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SingleDayChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
