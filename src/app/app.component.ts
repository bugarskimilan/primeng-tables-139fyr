import { Component } from '@angular/core';
import {dataService} from './data.service';

export interface Car {
    vin;
    year;
    brand;
    color;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  data: any[];

  cols: any[] = [];

  constructor(private dataservice: dataService){
    this.data = dataservice.data;
    this.cols = this.data[0].users[0].reports;
  }

  

}
