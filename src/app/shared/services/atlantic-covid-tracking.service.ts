import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CovidData } from '../interfaces/CovidData';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AtlanticCovidTrackingService {

  #http = inject(HttpClient);
  datePipe: DatePipe = new DatePipe("en-EN");
  #baseUrl = `https://api.covidtracking.com/v2/us/`;

  // Legacy method for my own reference when upgrading other Angular code bases
  getDailyByDateObservable(date: Date | null): Observable<CovidData> {
    const newDate = this.datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
    const url = `${this.#baseUrl}daily/${newDate}.json`;

    return this.#http.get<CovidData>(url).pipe(
      map((response: any) => this.mapResponseToCovidData(response))
    );
  }

  getDailyByDateSignal(date: Date | null): Signal<CovidData> {
    const newDate = this.datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
    const url = `${this.#baseUrl}daily/${newDate}.json`;

    const mappedData = toSignal(
      this.#http.get<CovidData>(url).pipe(
        map((response: any) => this.mapResponseToCovidData(response))
      ),
      { initialValue: {} as CovidData } // Provide initial value for the signal
    );

    return mappedData;
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
