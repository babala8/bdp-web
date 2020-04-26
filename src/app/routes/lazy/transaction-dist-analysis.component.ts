import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {ShufflingDataService} from './shufflingData.service';
import {SessionService} from '@core/session.service';
import * as echart from 'echarts';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';

let componentDataRequested = false;
let componentData: any;

@Component({
    selector: 'transaction-dist-analysis-component',
    // language=HTML
    template: `
        <div nz-row class="first-row">
            <span>交易分布分析</span>
        </div>
        <div id="echarts" style="width: 100%;height: 100%"></div>

    `,
    // language=CSS
    styles: [`
        div.first-row {
            color: #3F82AC;
            padding-left: 7px;
            padding-top: 5px;
            margin-bottom: 6px;
        }

        div.first-row span {
            position: absolute;
            top: -1px;
            left: 25px;
            font-size: 17px;
            background-repeat: no-repeat;
            background-image: url("./assets/images/screen/icon_cass.png");
            background-size: 23px 17px;
            color: #3F82AC;
            background-position: 3px 5px;
            text-indent: 34px;
        }

        div[echarts] {
            height: 100%;
            width: 84%;
            margin: 0 auto;
        }

    `]
})
export class TransactionDistAnalysisComponent implements OnInit, OnDestroy {

    option: any;
    chart: any;

    constructor(private service: LazyService,
                private shufflService: ShufflingDataService,
                private http: HttpClient,
                private session: SessionService,
                private element: ElementRef) {
    }

    ngOnInit(): void {

        if (!echart.getMap('上海市')) {
            const data = require('./shanghai.echarts.json');
            echart.registerMap('上海市', data);
        }
        if (!componentDataRequested) {
            this.getJsonData();
        } else {
            this.initEcharts(componentData);
        }

    }

    getJsonData() {
        this.http.get(`${environment.SERVICE_URL}insight/v2/portal/transAmt`)
            .subscribe(data1 => {
                componentDataRequested = true;
                componentData = data1;
                this.initEcharts(componentData);
            });

    }


    initEcharts(data: any) {
        const ele = this.element.nativeElement;
        this.chart = echart.init(ele.querySelector('#echarts'));
        const seriesData = [];
        let maxNumber = 0;
        let minNumber = 0;
        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item'
            },
            geo: {
                map: '上海市',
                label: {
                    normal: {
                        show: false,
                        color: '#fff'
                    },
                    emphasis: {
                        color: '#f6ff27'
                    }
                },
                zoom: 1.25,
                emphasis: {
                    label: {
                        show: true,
                        color: '#f8ffe0'
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        // areaColor: '#323c48',
                        areaColor: 'rgba(50,60,72,0.1)',
                        borderColor: '#fff'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            visualMap: {
                text: ['高', '低'],
                map: '上海市',
                realtime: false,
                calculable: false,
                textStyle: {
                    color: '#fff'
                },
                min: 0,
                max: 0
                // inRange: {
                //     color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43']
                // }
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
            animationDurationUpdate: 1000,
            series: [
                {
                    name: '上海市',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: []
                }
            ]
        };
        this.chart.setOption(option);
        data.retList.forEach(function (d, i) {

            if (i === 0) {
                minNumber = d.flowAmt;
            } else if (minNumber > d.flowAmt) {
                minNumber = d.flowAmt;
            }

            if (maxNumber < d.flowAmt) {
                maxNumber = d.flowAmt;
            }

            seriesData.push({
                name: d.orgName,
                value: [parseFloat(d.x), parseFloat(d.y), d.flowAmt]
            });
        });
        option.series[0].data = seriesData;
        option.visualMap.max = 150000;
        option.visualMap.min = minNumber;
        this.option = option;
        this.chart.setOption(this.option);

        window.addEventListener('resize', () => {
            try {
                this.chart.resize();
            } catch (e) {
                console.log('echarts实例乱报错!');
            }
        });

    }

    ngOnDestroy(): void {
        if (!!this.chart){
            this.chart.dispose();
        }
    }


}
