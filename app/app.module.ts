import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { ChartModule} from 'angular2-highcharts';
import { HttpService } from './Utilities/http.service'
import { TradeDataService, ChartComponent } from './chart/index';

@NgModule({
  imports:      [ BrowserModule,HttpModule,ChartModule ],
  declarations: [ AppComponent, ChartComponent],
  bootstrap:    [ AppComponent ],
  providers: [TradeDataService, HttpService]
})
export class AppModule { }
