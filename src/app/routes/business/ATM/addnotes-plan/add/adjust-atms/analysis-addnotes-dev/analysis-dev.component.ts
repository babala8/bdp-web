import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddnotesPlanService } from '../../../addnotes-plan.service';
import { HttpResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EChartOption } from 'echarts';
import { SessionService } from '@core';

@Component({
    templateUrl: './analysis-dev.html',
    styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class AnalysisDevComponent implements OnInit {
    formModel = {};
    devInfo;
    planAddnotesDate;
    validateForm: FormGroup;
    loading = false;
    foldDevHistoryBiztxlog: any = {};
    addnotesDatasSixDays = [];
    quadrantDevFlowAvgs: any = {};
    quadrantTables = [];
    baseInfoList = [];
    devHistoryBiztxlogAvg = [];

    constructor(
        private nzModal: NzModalService,
        private message: NzMessageService,
        private session: SessionService,
        private service: AddnotesPlanService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.analysisDevInfo(this.devInfo);
    }


    analysisDevInfo(itms) {
        const params = {
            devNo: itms.devNo || '',
            addnotesDate: this.planAddnotesDate || '',
            useDays: itms.useDays,
            addnotesAmount: itms.planAddnotesAmt || ''
        };
        this.service.analysisDevInfo(params)
            .subscribe(_data => {
                console.log(_data);
                this.foldDevHistoryBiztxlog = _data.element['foldDevHistoryBiztxlog'];
                this.echartsDataInit(this.foldDevHistoryBiztxlog);
                this.addnotesDatasSixDays = _data.element['addnotesDatasSixDays'];
                this.quadrantDevFlowAvgs = _data.element['quadrantDevFlowAvgs'];
                this.quadrantTables = _data.element['quadrantTables'];
                this.baseInfoList = [
                    {name: "设备编号", value: _data.element['devBaseInfo'].devNo},
                    {name: "加钞时间", value: _data.element['devBaseInfo'].addnotesDate},
                    {name: "使用天数", value: _data.element['devBaseInfo'].useDays},
                    {name: "加钞金额", value: _data.element['devBaseInfo'].addnotesAmount},
                ];
                this.devHistoryBiztxlogAvg = [
                    {name: "7天日均取款-存款", value: _data.element['devHistoryBiztxlogAvg7'].flowAvg},
                    {name: "7天日均取款", value: _data.element['devHistoryBiztxlogAvg7'].cwdAvg},
                    {name: "7天日均存款", value: _data.element['devHistoryBiztxlogAvg7'].cdmAvg},
                    {name: "30天日均取款-存款", value: _data.element['devHistoryBiztxlogAvg30'].flowAvg},
                    {name: "30天日均取款", value: _data.element['devHistoryBiztxlogAvg30'].cwdAvg},
                    {name: "30天日均存款", value: _data.element['devHistoryBiztxlogAvg30'].cdmAvg},
                    {name: "90天日均取款-存款", value: _data.element['devHistoryBiztxlogAvg90'].flowAvg},
                    {name: "90天日均取款", value: _data.element['devHistoryBiztxlogAvg90'].cwdAvg},
                    {name: "90天日均存款", value: _data.element['devHistoryBiztxlogAvg90'].cdmAvg},
                ];
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    data0 = [

    ];

    calculateMA(index) {
        let result = [];
        for (let i = 0; i < this.data0.length; i++) {
            result.push(this.data0[i][index]);
        }
        return result;
    }

    chartOption: EChartOption;

    echartsDataInit(result) {
        this.data0 = result;
        this.chartOption = {
            title: {
                text: `最近3年同期一个月的取款-存款`,
                left: '0'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['前年', '去年', '今年']
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: this.calculateMA(0),
                scale: true,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            },
            yAxis: {
                scale: true,
                name: '单位:万元',
                splitArea: {
                    show: true
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    show: true,
                    type: 'slider',
                    // y: "90%",
                    start: 50,
                    end: 100
                }
            ],
            series: [
                {
                    name: '前年',
                    type: 'line',
                    data: this.calculateMA(1),
                    smooth: true,
                    itemStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: '去年',
                    type: 'line',
                    data: this.calculateMA(2),
                    smooth: true,
                    itemStyle: {
                        normal: { opacity: 0.5 }
                    }
                },
                {
                    name: '今年',
                    type: 'line',
                    data: this.calculateMA(3),
                    smooth: true,
                    itemStyle: {
                        normal: { opacity: 0.5 }
                    }
                }

            ]
        };
    }

}
