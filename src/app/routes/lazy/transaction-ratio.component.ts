import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';

/**
 * echarts指令使用的方式参见：ngx-echarts
 */

@Component({
    selector: 'transaction-ratio-component',
    // language=HTML
    template: `
        <span class="title">交易趋势图</span>
        <div echarts [options]="option"></div>

    `,
    // language=CSS
    styles: [`
        * {
            margin: 0;
            padding: 0;
        }

        .title {
            position: absolute;
            top: -10px;
            left: 15px;
            font-size: 17px;
            background-repeat: no-repeat;
            background-image: url(./assets/images/screen/icon_Linechart.png);
            background-size: 26px 17px;
            color: #3F82AC;
            background-position: 1px 3px;
            text-indent: 33px;
        }

        div[echarts] {
            height: calc(100%);
        }

    `]
})
export class TransactionRatioComponent implements OnInit {

    option: any;
    optionData: any = {};
    types = ['存款金额', '取款金额', '存款预测金额', '取款预测金额'];
    legendTypes = ['存款金额', '取款金额'];


    constructor(private service: LazyService,
                private session: SessionService) {
    }

    ngOnInit() {
        this.modelData();
        // this.getTransListByOrgNo();
    }

    modelData() {
        const data = {
            'retCode': '00',
            'retList': [{'yearMonth': '2017-04', 'cwdAmt': 10574427100, 'cdmAmt': 8626144150}, {
                'yearMonth': '2017-05',
                'cwdAmt': 10792382600,
                'cdmAmt': 8807065450
            }, {'yearMonth': '2017-06', 'cwdAmt': 10581083400, 'cdmAmt': 8535206450}, {
                'yearMonth': '2017-07',
                'cwdAmt': 10975267400,
                'cdmAmt': 8797144370
            }, {'yearMonth': '2017-08', 'cwdAmt': 11158018600, 'cdmAmt': 8744723090}, {
                'yearMonth': '2017-09',
                'cwdAmt': 11730816800,
                'cdmAmt': 9094970730
            }, {'yearMonth': '2017-10', 'cwdAmt': 10425293300, 'cdmAmt': 8491912290}, {
                'yearMonth': '2017-11',
                'cwdAmt': 10869920400,
                'cdmAmt': 8766172050
            }, {'yearMonth': '2017-12', 'cwdAmt': 11914263300, 'cdmAmt': 9314731380}, {
                'yearMonth': '2018-01',
                'cwdAmt': 11425505500,
                'cdmAmt': 9031667790
            }, {'yearMonth': '2018-02', 'cwdAmt': 12288074400, 'cdmAmt': 9580868460}, {
                'yearMonth': '2018-03',
                'cwdAmt': 10405495400,
                'cdmAmt': 9231745000
            }, {'yearMonth': '2018-04', 'cwdAmt': 9879273500, 'cdmAmt': 8105545682}, {
                'yearMonth': '2018-05',
                'cwdAmt': 9979416000,
                'cdmAmt': 8050940733
            }, {'yearMonth': '2018-06', 'cwdAmt': 9727744100, 'cdmAmt': 7669988332}, {
                'yearMonth': '2018-07',
                'cwdAmt': 9880489500,
                'cdmAmt': 7775027410
            }, {'yearMonth': '2018-08', 'cwdAmt': 10231164400, 'cdmAmt': 7822909400}, {
                'yearMonth': '2018-09',
                'cwdAmt': 11208565100,
                'cdmAmt': 8662823800
            }, {'yearMonth': '2018-10', 'cwdAmt': 9993351100, 'cdmAmt': 8107246300}, {
                'yearMonth': '2018-11',
                'cwdAmt': 10329366800,
                'cdmAmt': 8329944200
            }, {'yearMonth': '2018-12', 'cwdAmt': 9330359500, 'cdmAmt': 7424231000}],
            'retMsg': '查询机构历史收付量成功'
        };

        const xAxisData = [], seriesData = [[], [], [], []];
        console.log(data);
        data.retList.forEach(function (value, key, arry) {
            xAxisData.push(value.yearMonth);

            seriesData[0].push(value.cdmAmt / 1000000);   //取款金额
            seriesData[1].push(value.cwdAmt / 1000000);   //存款金额
        });

        this.option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.legendTypes,
                right: 10,
                top: 10,
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    color: '#2D8EC5'
                }
            ],
            yAxis: {
                name: '单位(百万)',
                type: 'value',
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
                splitLine: {
                    show: false,//去除网格线
                    splitArea: {
                        areaStyle: {
                            color: '#2D8EC5'
                        }
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                    }
                }
            },
            grid: {
                top: 42,
                bottom: 25,
                left: 50,
                right: 30
            },
            series: [
                {
                    name: '取款金额',
                    type: 'line',
                    data: seriesData[0]
                },
                {
                    name: '存款金额',
                    type: 'line',
                    data: seriesData[1]
                }
            ],
            color: ['#3398DB', '#B6A2DE', '#5AB1EF', '#FFB980']
        };


    }

    getTransListByOrgNo() {
        const params = {orgNo: this.session.orgNo};
        this.service.getTransListByOrgNo(params).subscribe(data => {
            const xAxisData = [], seriesData = [[], [], [], []];
            console.log(data);
            data.retList.forEach(function (value, key, arry) {
                xAxisData.push(value.yearMonth);

                seriesData[0].push(value.cdmAmt / 1000000);   // 取款金额
                seriesData[1].push(value.cwdAmt / 1000000);   // 存款金额
            });

            this.option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.legendTypes,
                    right: 10,
                    top: 10,
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisData,
                        color: '#2D8EC5'
                    }
                ],
                yAxis: {
                    name: '单位(百万)',
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            // 设置y轴颜色
                            color: '#2D8EC5'
                        }
                    },
                    splitLine: {
                        show: false, // 去除网格线
                        splitArea: {
                            areaStyle: {
                                color: '#2D8EC5'
                            }
                        }
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                        }
                    }
                },
                grid: {
                    top: 42,
                    bottom: 25,
                    left: 50,
                    right: 30
                },
                series: [
                    {
                        name: '取款金额',
                        type: 'line',
                        data: seriesData[0]
                    },
                    {
                        name: '存款金额',
                        type: 'line',
                        data: seriesData[1]
                    }
                ],
                color: ['#3398DB', '#B6A2DE', '#5AB1EF', '#FFB980']
            };
        });
    }


    // initOption() {
    //     this.option = {
    //         tooltip: {
    //             trigger: 'axis'
    //         },
    //         legend: {
    //             data: this.legendTypes,
    //             right: 10,
    //             top: 10,
    //             textStyle: {
    //                 color: '#fff'
    //             }
    //         },
    //         xAxis: {
    //             type: 'category',
    //             boundaryGap: false,
    //             data: this.optionData.date,
    //             axisLine: {
    //                 lineStyle: {
    //                     // 设置y轴颜色
    //                     color: '#2D8EC5'
    //                 }
    //             },
    //         },
    //         yAxis: {
    //             name: '单位(百万)',
    //             type: 'value',
    //             axisLine: {
    //                 lineStyle: {
    //                     // 设置y轴颜色
    //                     color: '#2D8EC5'
    //                 }
    //             },
    //             splitLine: {
    //                 show: false,//去除网格线
    //                 splitArea: {
    //                     areaStyle: {
    //                         color: '#2D8EC5'
    //                     }
    //                 }
    //             },
    //             splitArea: {
    //                 show: true,
    //                 areaStyle: {
    //                     color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
    //                 }
    //             }
    //         },
    //         grid: {
    //             top: 42,
    //             bottom: 25,
    //             left: 50,
    //             right: 30
    //         },
    //         series: this.optionData.data,
    //         color: ['#3398DB', '#B6A2DE', '#5AB1EF', '#FFB980']
    //     };
    // }

}
