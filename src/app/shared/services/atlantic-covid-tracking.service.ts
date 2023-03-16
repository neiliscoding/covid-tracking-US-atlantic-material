import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtlanticCovidTrackingService {

  datePipe: DatePipe = new DatePipe("en-EN");

  constructor(private http: HttpClient) { }

  //  https://api.covidtracking.com/v2/us/daily/2021-01-02.json

  getDailyByDate(date: Date | null): Observable<any> {
    let newDate = this.datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
    console.log(newDate);

    return this.http.get('https://api.covidtracking.com/v2/us/daily/' + newDate + '.json').pipe();
  }

  getDailyByDateOld(date: Date | null): Observable<any> {
    let newDate = this.datePipe.transform(date, 'yyyy-MM-dd', 'es-ES');
    console.log(newDate);

    const result = this.http.get('https://api.covidtracking.com/v2/us/daily/' + newDate + '.json');
    console.log(result);
    return result;
  }

}
