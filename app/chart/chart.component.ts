import { Component, OnInit } from '@angular/core';
import { Candle, TradeDataService } from './shared/index';
import { Observable } from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'candle-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.css']
})

export class ChartComponent implements OnInit {
    observableCandles: Observable<Candle[]>
    candles: Candle[];
    options: Object;
    xAxis:any;
    resetting:boolean;

    constructor(private tradeDataService: TradeDataService) { 
        this.candles = [];
        this.candles.map.bind(this);
    }

    ngOnInit() {
        this.tradeDataService.getCandles('',false).subscribe(n => {
            this.candles = n;
            this.setOptions();
        });
    }

    setOptions() {        
        let candleData= this.candles.map(n=>this.formatCandleDataForChart(n));
        let maData = this.candles.map(n=>this.formatMADataForChart(n));
        let volumeData = this.candles.map(n=>this.formatVolumeDataForChart(n));
        let dataGrouping = {
                    units : [
                        [
                            'week', // unit name
                            [1] // allowed multiples
                        ], [
                            'month',
                            [1, 2, 3, 4, 6]
                        ]
                    ]
                };
        this.options = {
            title : { text : 'CandleSticks' },
            rangeSelector : {
                selected : 1
            },
            tooltip: {
                split: true
            },
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Candle and 5 Day MA'
                },
                height: '80%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '85%',
                height: '15%',
                offset: 0,
                lineWidth: 2
            }],
            series : [{
                type : 'candlestick',
                name : 'CandleSticks',
                data : candleData,
                dataGrouping : dataGrouping
            },
            {
                data : maData,
                dataGrouping : dataGrouping
            },
            {
                name : 'Volume',
                type : 'column',
                data : volumeData,
                yAxis : 1,
                dataGrouping : dataGrouping
            }]
        };
    }

    reload(){
        this.tradeDataService.getCandles('',true).subscribe(n => {
            this.candles = n;
            this.setOptions();
        });
    }

    formatCandleDataForChart(candle: Candle) {
        let array:Number[]=[];
        array.push(candle.date.getTime());
        array.push(candle.open);
        array.push(candle.high);
        array.push(candle.low);
        array.push(candle.close);
        return array;    
    }

    formatMADataForChart(candle: Candle) {
        let array:Number[]=[];
        array.push(candle.date.getTime());
        array.push(candle.MA5Day);
        return array;
    }

    formatVolumeDataForChart(candle: Candle) {
        let array:Number[]=[];
        array.push(candle.date.getTime());
        array.push(candle.volume);
        return array;
    }
}