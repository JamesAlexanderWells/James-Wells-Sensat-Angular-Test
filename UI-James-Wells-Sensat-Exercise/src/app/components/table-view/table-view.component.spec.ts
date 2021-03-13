import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FileReadService} from '../../services/file-read.service';
import {of} from 'rxjs';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;
  let fileService;
  const sensorReadings =
    [{id: '2', box_id: '2', sensor_type: 'type2', name: 'name2', range_l: 2, range_u: 2, longitude: 2, latitude: 2, reading: 2, unit: 'unit2', reading_ts: '10:10:12'},
      {id: '1', box_id: '1', sensor_type: 'type1', name: 'name1', range_l: 1, range_u: 1, longitude: 1, latitude: 1, reading: 1, unit: 'unit1', reading_ts: '10:10:11'},
      {id: '3', box_id: '3', sensor_type: 'type3', name: 'name3', range_l: 3, range_u: 3, longitude: 3, latitude: 3, reading: 3, unit: 'unit3', reading_ts: '10:10:13'}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewComponent ],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fileService = TestBed.inject(FileReadService);
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(fileService, 'getAvailableSensorReadings').and.returnValue(of(sensorReadings));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should apply filter on sensor type',  () => {
    component.applyFilter({target: {value: '  TYpe2'}});
    expect(component.dataSource.filteredData).toEqual([sensorReadings[0]]);
  });

  it('should apply filter on name', () => {
    component.applyFilter({target: {value: '  nAme2'}});
    expect(component.dataSource.filteredData).toEqual([sensorReadings[0]]);
  });

  it('should not apply filter on a non name or type column',  () => {
    component.applyFilter({target: {value: '  unit1'}});
    expect(component.dataSource.filteredData).toEqual([]);
  });

  it('should sort ascending reading timestamp',  () => {
    component.sortData({active: 'reading_ts', direction: 'asc'});
    expect(component.dataSource.data[0].reading_ts).toEqual('10:10:11');
    expect(component.dataSource.data[1].reading_ts).toEqual('10:10:12');
    expect(component.dataSource.data[2].reading_ts).toEqual('10:10:13');
  });

  it('should sort descending reading timestamp',  () => {
    component.sortData({active: 'reading_ts', direction: 'desc'});
    expect(component.dataSource.data[0].reading_ts).toEqual('10:10:13');
    expect(component.dataSource.data[1].reading_ts).toEqual('10:10:12');
    expect(component.dataSource.data[2].reading_ts).toEqual('10:10:11');
  });

  it('should sort descending sensor type',  () => {
    component.sortData({active: 'sensor_type', direction: 'desc'});
    expect(component.dataSource.data[0].sensor_type).toEqual('type3');
    expect(component.dataSource.data[1].sensor_type).toEqual('type2');
    expect(component.dataSource.data[2].sensor_type).toEqual('type1');
  });

  it('should sort ascending sensor type',  () => {
    component.sortData({active: 'sensor_type', direction: 'asc'});
    expect(component.dataSource.data[0].sensor_type).toEqual('type1');
    expect(component.dataSource.data[1].sensor_type).toEqual('type2');
    expect(component.dataSource.data[2].sensor_type).toEqual('type3');
  });

  it('should not sort on no option',  () => {
    component.sortData({active: 'sensor_type', direction: 'asc'});
    component.sortData({active: null, direction: null});
    expect(component.dataSource.data[0].sensor_type).toEqual('type2');
    expect(component.dataSource.data[1].sensor_type).toEqual('type1');
    expect(component.dataSource.data[2].sensor_type).toEqual('type3');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
