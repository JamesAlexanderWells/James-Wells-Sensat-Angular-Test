import { TestBed } from '@angular/core/testing';

import { FileReadService } from './file-read.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('FileReadService', () => {
  let service: FileReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]});
    service = TestBed.inject(FileReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
