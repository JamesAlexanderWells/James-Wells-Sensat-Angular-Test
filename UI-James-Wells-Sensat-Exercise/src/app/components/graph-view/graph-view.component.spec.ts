import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphViewComponent } from './graph-view.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {FileReadService} from '../../services/file-read.service';
import {of} from 'rxjs';

describe('GraphViewComponent', () => {
  let component: GraphViewComponent;
  let fixture: ComponentFixture<GraphViewComponent>;
  let fileService;
  const fb: FormBuilder = new FormBuilder();
  const sensorReadings =
    [{id: '1', box_id: '1', sensor_type: 'type1', name: 'name1', range_l: 1, range_u: 1, longitude: 1, latitude: 1, reading: 1, unit: 'unit1', reading_ts: '10:10:11'},
      {id: '2', box_id: '2', sensor_type: 'type2', name: 'name2', range_l: 2, range_u: 2, longitude: 2, latitude: 2, reading: 2, unit: 'unit2', reading_ts: '10:10:12'}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphViewComponent ],
      providers: [HttpClient, HttpHandler, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fileService = TestBed.inject(FileReadService);
    fixture = TestBed.createComponent(GraphViewComponent);
    component = fixture.componentInstance;
    component.form = fb.group({
      sensorId: [''],
    });
    fixture.detectChanges();
    spyOn(fileService, 'getAvailableSensorReadings').and.returnValue(of(sensorReadings));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data', () => {
    expect(component.form.controls.sensorId.value).toEqual('1');
    expect(component.sensorOptions).toEqual(['1', '2']);
  });

  it('should set graph data', () => {
    component.form.controls.sensorId.setValue('2');
    expect(component.data).toEqual({ labels: [ '10:10:12' ], datasets: [ Object({ label: '2', data: [ 2 ], fill: false, borderColor: '#4bc0c0' }) ] });
  });
});
