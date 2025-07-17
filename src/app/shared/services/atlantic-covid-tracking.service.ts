import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { CovidData } from '../interfaces/CovidData';

@Injectable({
  providedIn: 'root'
})
export class AtlanticCovidTrackingService {

  datePipe: DatePipe = new DatePipe("en-EN");

  constructor(private http: HttpClient) { }

  getDailyByDate(date: Date | null): Observable<CovidData> {
    const newDate = this.datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
    const url = `https://api.covidtracking.com/v2/us/daily/${newDate}.json`;

    return this.http.get<CovidData>(url).pipe(
      map((response: any) => this.mapResponseToCovidData(response))
    );
  }

  private mapResponseToCovidData(response: any): CovidData {
    const data = response.data;
    console.log('mapResponseToCovidData data', data);

    const covidData: CovidData = {
      meta: {
        build_time: response.meta.build_time,
        license: response.meta.license,
        version: response.meta.version,
        field_definitions: response.meta.field_definitions
      },
      data: {
        date: data.date,
        states: data.states,
        cases: {
          total: {
            value: data.cases.total.value,
            calculated: data.cases.total.calculated
          }
        },
        testing: {
          total: {
            value: data.testing.total.value,
            calculated: data.testing.total.calculated
          }
        },
        outcomes: {
          hospitalized: {
            currently: {
              value: data.outcomes.hospitalized.currently.value,
              calculated: data.outcomes.hospitalized.currently.calculated
            },
            in_icu: {
              currently: {
                value: data.outcomes.hospitalized.in_icu.currently.value,
                calculated: data.outcomes.hospitalized.in_icu.currently.calculated
              }
            },
            on_ventilator: {
              currently: {
                value: data.outcomes.hospitalized.on_ventilator.currently.value,
                calculated: data.outcomes.hospitalized.on_ventilator.currently.calculated
              }
            }
          },
          death: {
            total: {
              value: data.outcomes.death.total.value,
              calculated: data.outcomes.death.total.calculated
            }
          }
        }
      }
    };
    return covidData;
  }

}
