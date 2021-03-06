import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileReadService} from '../../services/file-read.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {
  private completeData = [];
  form: FormGroup;
  sensorOptions = [];
  sensorIdControl = 'sensorId';

  data: any;

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

  private initializeComponentData(jsonReadings) {
    this.sensorOptions = [...new Set(jsonReadings.map(jsonObj => jsonObj.id))];
    this.completeData = jsonReadings;
    this.form.controls[this.sensorIdControl].setValue(this.sensorOptions[0]);
  }


  ngOnInit(): void {
    this.form = this.fb.group({
    sensorId: [],
  });
    this.form.controls[this.sensorIdControl].valueChanges.subscribe(newSensor => this.setGraphData(newSensor));
    this.sensorService.getAvailableSensorReadings().subscribe(jsonReadings => {
      this.initializeComponentData(jsonReadings);
    });
  }

  setGraphData(boxId: string){
    const filteredDisplayData = this.completeData.filter(jsonObj => jsonObj.id === boxId);
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
