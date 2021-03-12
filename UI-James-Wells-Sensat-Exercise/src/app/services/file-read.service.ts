import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileReadService {

  availableSensorReadings = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getSensorReadings().subscribe(fileText => this.populateSensorReadings(fileText));
  }

  getSensorReadings(): Observable<any> {
    return this.http.get('assets/sensor_readings.json', {responseType: 'text'});
  }

  private populateSensorReadings(fileText: string) {
    this.availableSensorReadings
      .next(fileText.split('\r\n').filter(jsonString => jsonString.length > 0).map(jsonString => JSON.parse(jsonString)));
  }
}
