import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphViewComponent } from './graph-view.component';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {FormBuilder} from "@angular/forms";

describe('GraphViewComponent', () => {
  let component: GraphViewComponent;
  let fixture: ComponentFixture<GraphViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphViewComponent ],
      providers: [HttpClient, HttpHandler, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
