import { SingleDayComponent } from './single-day/single-day.component';
import { SingleDayDatepickerComponent } from './single-day/single-day-datepicker/single-day-datepicker.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SingleDayTableComponent } from './single-day/single-day-table/single-day-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SingleDayChartComponent } from './single-day/single-day-chart/single-day-chart.component';

@NgModule({ declarations: [
        AppComponent,
        SingleDayComponent,
        SingleDayDatepickerComponent,
        SingleDayTableComponent,
        SingleDayChartComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        FormsModule,
        NgxChartsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
