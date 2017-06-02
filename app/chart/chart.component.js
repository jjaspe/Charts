"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./shared/index");
var ChartComponent = (function () {
    function ChartComponent(tradeDataService) {
        this.tradeDataService = tradeDataService;
        this.candles = [];
        this.candles.map.bind(this);
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tradeDataService.getCandles('', false).subscribe(function (n) {
            _this.candles = n;
            _this.setOptions();
        });
    };
    ChartComponent.prototype.setOptions = function () {
        var _this = this;
        var candleData = this.candles.map(function (n) { return _this.formatCandleDataForChart(n); });
        var maData = this.candles.map(function (n) { return _this.formatMADataForChart(n); });
        var volumeData = this.candles.map(function (n) { return _this.formatVolumeDataForChart(n); });
        var dataGrouping = {
            units: [
                [
                    'week',
                    [1] // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]
            ]
        };
        this.options = {
            title: { text: 'CandleSticks' },
            rangeSelector: {
                selected: 1
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
            series: [{
                    type: 'candlestick',
                    name: 'CandleSticks',
                    data: candleData,
                    dataGrouping: dataGrouping
                },
                {
                    data: maData,
                    dataGrouping: dataGrouping
                },
                {
                    name: 'Volume',
                    type: 'column',
                    data: volumeData,
                    yAxis: 1,
                    dataGrouping: dataGrouping
                }]
        };
    };
    ChartComponent.prototype.reload = function () {
        var _this = this;
        this.tradeDataService.getCandles('', true).subscribe(function (n) {
            _this.candles = n;
            _this.setOptions();
        });
    };
    ChartComponent.prototype.formatCandleDataForChart = function (candle) {
        var array = [];
        array.push(candle.date.getTime());
        array.push(candle.open);
        array.push(candle.high);
        array.push(candle.low);
        array.push(candle.close);
        return array;
    };
    ChartComponent.prototype.formatMADataForChart = function (candle) {
        var array = [];
        array.push(candle.date.getTime());
        array.push(candle.MA5Day);
        return array;
    };
    ChartComponent.prototype.formatVolumeDataForChart = function (candle) {
        var array = [];
        array.push(candle.date.getTime());
        array.push(candle.volume);
        return array;
    };
    return ChartComponent;
}());
ChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'candle-chart',
        templateUrl: 'chart.component.html',
        styleUrls: ['chart.component.css']
    }),
    __metadata("design:paramtypes", [index_1.TradeDataService])
], ChartComponent);
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map