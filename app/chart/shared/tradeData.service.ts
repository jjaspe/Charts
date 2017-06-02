import { Injectable } from '@angular/core';
import { Candle } from './candle.model';
import { Observable, Subject } from "rxjs/Rx";
import { HttpService } from '../../Utilities/http.service'

@Injectable()
export class TradeDataService {
    baseUrl: string = "http://localhost:5000/api/";
    obsCandles: Observable<Candle[]>;
    candlesSubject: Subject<Candle[]>;

    constructor(private httpService: HttpService) {
        this.candlesSubject = new Subject<Candle[]>();
    }

    getSymbols() {

    }

    getCandlesFromAPI(reload: boolean) {
        let fullUrl = this.baseUrl + "CompanyData?reload="+reload;
        this.httpService.get(fullUrl).subscribe(s => {
            console.log(s);
            let tradeData = s[0].tradeData;
            let candles:Candle[] = [];
            tradeData.forEach(candle => {
                candles.push({
                    date: new Date(candle.date),
                    high: candle.high,
                    low: candle.low,
                    open: candle.open,
                    close: candle.close,
                    volume: candle.volume,
                    MA5Day: candle.movingAverage.fiveDay
                })
            });
            console.log(candles);
            this.candlesSubject.next(candles);
        });
    }

    getCandles(symbol: string, reload: boolean):Observable<Candle[]> {
        this.getCandlesFromAPI(reload);
        return this.candlesSubject.asObservable();
    }

    getTest() {
        return this.httpService.get('https://www.highcharts.com/samples/data/jsonp.php?a=e&filename=aapl-ohlc.json');        
    }
}