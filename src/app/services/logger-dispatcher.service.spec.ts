import { TestBed } from '@angular/core/testing';

import { LoggerDispatcherService } from './logger-dispatcher.service';

describe('LoggerDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerDispatcherService = TestBed.get(LoggerDispatcherService);
    expect(service).toBeTruthy();
  });
});
