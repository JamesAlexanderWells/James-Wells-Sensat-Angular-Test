import { TestBed } from '@angular/core/testing';

import { FileReadService } from './file-read.service';
import {HttpClient} from '@angular/common/http';
import {cold, hot} from 'jasmine-marbles';
import {filter} from 'rxjs/operators';

describe('FileReadService', () => {
  let service: FileReadService;
  let httpClient: any;

  const sensorReadings = '{"id1": "id1Val1", "id2": "id2Val1"}\n' +
    '{"id1": "id1Val2", "id2": "id2Val2"}';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: jasmine.createSpyObj('http', ['get'])}]});
    httpClient = TestBed.inject(HttpClient);
    const result = hot('-a|', {a: sensorReadings});
    httpClient.get.and.returnValue(result);
    service = new FileReadService(httpClient);
  });

  it('should populate availableSensorReadings', () => {
    service.getAvailableSensorReadings()
      .pipe(filter(val => val.length > 0))
      .subscribe(readings => expect(readings).toEqual([{id1: 'id1Val1', id2: 'id2Val1'}, {id1: 'id1Val2', id2: 'id2Val2'}]));
  });
});
