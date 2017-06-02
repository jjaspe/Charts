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
var Rx_1 = require("rxjs/Rx");
var http_service_1 = require("../../Utilities/http.service");
var TradeDataService = (function () {
    function TradeDataService(httpService) {
        this.httpService = httpService;
        this.baseUrl = "http://localhost:5000/api/";
        this.candlesSubject = new Rx_1.Subject();
    }
    TradeDataService.prototype.getSymbols = function () {
    };
    TradeDataService.prototype.getCandlesFromAPI = function (reload) {
        var _this = this;
        var fullUrl = this.baseUrl + "CompanyData?reload=" + reload;
        this.httpService.get(fullUrl).subscribe(function (s) {
            console.log(s);
            var tradeData = s[0].tradeData;
            var candles = [];
            tradeData.forEach(function (candle) {
                candles.push({
                    date: new Date(candle.date),
                    high: candle.high,
                    low: candle.low,
                    open: candle.open,
                    close: candle.close,
                    volume: candle.volume,
                    MA5Day: candle.movingAverage.fiveDay
                });
            });
            console.log(candles);
            _this.candlesSubject.next(candles);
        });
    };
    TradeDataService.prototype.getCandles = function (symbol, reload) {
        this.getCandlesFromAPI(reload);
        return this.candlesSubject.asObservable();
    };
    TradeDataService.prototype.getTest = function () {
        return this.httpService.get('https://www.highcharts.com/samples/data/jsonp.php?a=e&filename=aapl-ohlc.json');
    };
    return TradeDataService;
}());
TradeDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], TradeDataService);
exports.TradeDataService = TradeDataService;
//# sourceMappingURL=tradeData.service.js.map