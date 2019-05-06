import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,TableModule, CheckboxModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
