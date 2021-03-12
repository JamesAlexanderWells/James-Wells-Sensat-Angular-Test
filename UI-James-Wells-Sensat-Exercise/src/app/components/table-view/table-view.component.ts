import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FileReadService} from '../../services/file-read.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SensorReading} from '../../models/sensor-reading';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayData = [];
  displayedColumns: string[] = ['id', 'box_id', 'sensor_type', 'name', 'range_l', 'range_u',
  'longitude', 'latitude', 'reading', 'unit', 'reading_ts'];
  globalFilter = '';



  constructor(private sensorService: FileReadService) { }

  ngOnInit(): void {
    this.sensorService.availableSensorReadings.subscribe(jsonReadings => {
      this.displayData = jsonReadings;
      this.populateDataSource(this.displayData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.displayData.slice();
    let sortedData = [];
    if (!sort.active || sort.direction === '') {
      this.populateDataSource(this.displayData);
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'sensor_type': return this.compare(a.sensor_type, b.sensor_type, isAsc);
        case 'reading_ts': return this.compare(a.reading_ts, b.reading_ts, isAsc);
        default: return 0;
      }
    });

    this.populateDataSource(sortedData);
  }

  private populateDataSource(data){
    this.dataSource = new MatTableDataSource<SensorReading>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (dataItem, filter) => {
      return dataItem.sensor_type.toLowerCase().includes(filter)
        || dataItem.name.toLowerCase().includes(filter);
    };
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}
