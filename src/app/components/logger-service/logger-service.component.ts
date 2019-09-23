import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logger-service',
  templateUrl: './logger-service.component.html',
  styleUrls: ['./logger-service.component.scss'],
})
export class LoggerServiceComponent implements OnInit {

  constructor(public logger: LoggerService) { }

  ngOnInit() {}

}
