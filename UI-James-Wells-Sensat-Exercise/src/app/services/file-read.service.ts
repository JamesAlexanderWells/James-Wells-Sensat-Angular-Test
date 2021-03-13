import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileReadService {

  private availableSensorReadings = new BehaviorSubject([]);

  private getSensorReadings(): Observable<any> {
    return this.http.get('assets/sensor_readings.json', {responseType: 'text'});
  }

  private populateSensorReadings(fileText: string) {
    this.availableSensorReadings
      .next(fileText.split('\n').filter(jsonString => jsonString.length > 0).map(jsonString => JSON.parse(jsonString)));
  }

  constructor(private http: HttpClient) {
    this.getSensorReadings().subscribe(fileText => this.populateSensorReadings(fileText), error => {console.log(error); });
  }

  getAvailableSensorReadings(){
    return this.availableSensorReadings;
  }

}
