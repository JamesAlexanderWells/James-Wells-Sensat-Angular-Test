import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileReadService} from '../../services/file-read.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {
  form: FormGroup;
  sensorOptions = [];
  sensorId = 'sensorId';

  data: any;

  displayData = [];
  basicOptions = {
    legend: {
      labels: {
        fontColor: '#495057'
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#495057'
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: '#495057'
        }
      }]
    }
  };
  constructor(private sensorService: FileReadService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
    sensorId: [],
  });
    this.form.controls[this.sensorId].valueChanges.subscribe(newSensor => this.setGraphData(newSensor));
    this.sensorService.availableSensorReadings.subscribe(jsonReadings => {
      this.initializeComponentData(jsonReadings);
    });
  }

  private initializeComponentData(jsonReadings) {
    this.sensorOptions = [...new Set(jsonReadings.map(jsonObj => jsonObj.id))];
    this.displayData = jsonReadings;
    this.form.controls[this.sensorId].setValue(this.sensorOptions[0]);
  }

  setGraphData(boxId: string){
    const filteredDisplayData = this.displayData.filter(jsonObj => jsonObj.id === boxId);
    this.data = {
      labels: filteredDisplayData.map(jsonObj => jsonObj.reading_ts),
      datasets: [
        {
          label: boxId,
          data: filteredDisplayData.map(jsonObj => jsonObj.reading),
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
  }

}
