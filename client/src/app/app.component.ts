import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [SocketService]
})

export class AppComponent implements OnInit {
  private readings: number[];
  private ioConnection: any;
  private isParkingAvailable: boolean = true;
  private title: string = 'Parking Finder';
  private lat: number = 53.442961;
  private lng: number = -6.198118;
  private zoom: number = 17;
  private MAX_ARRAY_SIZE: number = 5;
  private MAX_FREE_DISTANCE: number = 20;

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.initIoConnection();
    this.readings = [];
  }

  private initIoConnection(): void {
    this.ioConnection =
      this.socketService
        .get()
        .subscribe((reading: string) => {
          this.readings.push(parseInt(reading, 10));

          if (this.readings.length > this.MAX_ARRAY_SIZE) {
            this.readings.shift();
          }

          this.isParkingAvailable = (this.readings.reduce((x, y) => x + y) / this.MAX_ARRAY_SIZE) > this.MAX_FREE_DISTANCE;
        });
  }
}