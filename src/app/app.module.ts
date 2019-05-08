import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import { CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,TableModule, CheckboxModule, CardModule, ButtonModule, DialogModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
