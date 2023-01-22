import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtlanticCovidTrackingService {

  constructor(private http: HttpClient) { }

  //  https://api.covidtracking.com/v2/us/daily/2021-01-02.json

  getDailyByDate(): Observable<any> {
    const result = this.http.get('https://api.covidtracking.com/v2/us/daily/2021-01-02.json');
    console.log(result);
    return result;
  }

}
