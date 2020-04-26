import {Component, OnInit, OnDestroy} from '@angular/core';
import {LazyService} from './lazy.service';
import {ShufflingDataService} from './shufflingData.service';
import {SessionService} from '@core/session.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';


let componentDataRequested = false;
let componentData = [];

@Component({
    selector: 'transaction-ratio-component',
    // language=HTML
    template: `
        <div nz-row class="first-row">
            <span>网点收付量排名前十</span>
        </div>
        <div class="content">
            <div style="height: 100%" echarts [options]="option" [autoResize]="true"></div>
        </div>

    `,
    // language=CSS
    styles: [`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

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
            background-image: url(./assets/images/screen/icon_pie.png);
            background-size: 23px 17px;
            color: #3F82AC;
            background-position: 3px 5px;
            text-indent: 34px;
        }

        .content {
            position: relative;
            height: calc(100% - 38px);
            width: 100%;
            margin: 0;
        }

        /*.content .out-option {*/
        /*width: 90%;*/
        /*height: 100%;*/
        /*margin: 0 auto;*/
        /*}*/

        /*.content .in-option {*/
        /*position: absolute;*/
        /*top: 50%;*/
        /*left: 35%;*/
        /*width: 30%;*/
        /*height: 28%;*/
        /*}*/
    `]
})
export class TransactionTypeAnalysisComponent implements OnInit, OnDestroy {
    option: any;

    constructor(private service: LazyService,
                private shufflService: ShufflingDataService,
                private http: HttpClient,
                private session: SessionService) {
    }

    ngOnInit() {
        if (!componentDataRequested) {
            // this.qryOrgTransAmtRanking();
          this.model_data();
        } else {
            this.initOption(componentData);
          // this.model_data();
        }
    }

  model_data() {
        const data = {
            'retCode': '00',
            'retList': [{
                'cwdAmt': 75723200,
                'orgNo': '0440200812',
                'flowAmt': 147710900,
                'sortNo': '1',
                'orgName': '某双流蛟龙港支行附行式自助银行',
                'cdmAmt': 71987700
            }, {
                'cwdAmt': 80139700,
                'orgNo': '0440200698',
                'flowAmt': 124601100,
                'sortNo': '2',
                'orgName': '某东大黄田坝支行附行式自助银行',
                'cdmAmt': 44461400
            }, {
                'cwdAmt': 60884600,
                'orgNo': '0440200694',
                'flowAmt': 110271100,
                'sortNo': '3',
                'orgName': '某双流华阳支行附行式自助银行',
                'cdmAmt': 49386500
            }, {
                'cwdAmt': 54393300,
                'orgNo': '0440201658',
                'flowAmt': 105418100,
                'sortNo': '4',
                'orgName': '某双流西南航空港支行附行式自助银行',
                'cdmAmt': 51024800
            }, {
                'cwdAmt': 52971900,
                'orgNo': '0440201478',
                'flowAmt': 98107100,
                'sortNo': '5',
                'orgName': '某新都物流大道支行附行式自助银行',
                'cdmAmt': 45135200
            }, {
                'cwdAmt': 51206800,
                'orgNo': '0440200714',
                'flowAmt': 96804100,
                'sortNo': '6',
                'orgName': '某龙泉十陵支行附行式自助银行',
                'cdmAmt': 45597300
            }, {
                'cwdAmt': 49545400,
                'orgNo': '0440200824',
                'flowAmt': 92085400,
                'sortNo': '7',
                'orgName': '某春熙成龙大道分理处附行式自助银行',
                'cdmAmt': 42540000
            }, {
                'cwdAmt': 47399500,
                'orgNo': '0440201730',
                'flowAmt': 91128500,
                'sortNo': '8',
                'orgName': '某新都花都大道支行自助银行',
                'cdmAmt': 43729000
            }, {
                'cwdAmt': 45322900,
                'orgNo': '0440201663',
                'flowAmt': 87888100,
                'sortNo': '9',
                'orgName': '某芷泉万科路支行附行式自助银行',
                'cdmAmt': 42565200
            }, {
                'cwdAmt': 32837100,
                'orgNo': '0440200801',
                'flowAmt': 87401800,
                'sortNo': '10',
                'orgName': '某草市铁路支行附行式自助银行',
                'cdmAmt': 54564700
            }],
            'retMsg': '查询网点现金收付量排名成功'
        };

        const xAxis = [];
        const data1 = [];
        const data2 = [];
        data.retList.forEach(function (d) {
            xAxis.push(d.orgName);
            data1.push(d.cdmAmt);
            data2.push(d.cwdAmt);
        });
        this.option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['存款', '取款']
            },
            color: ['#3398DB', '#B6A2DE', '#5AB1EF', '#FFB980'],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: xAxis,
                show: false
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '存款',
                    type: 'bar',
                    data: data1
                },
                {
                    name: '取款',
                    type: 'bar',
                    data: data2
                }
            ]
        };
    }
    qryOrgTransAmtRanking() {
        this.http.get(`${environment.SERVICE_URL}insight/v2/portal/transAmtRank`).subscribe((data: any) => {
            componentDataRequested = true;
            componentData = data;
            this.initOption(componentData);
        });
    }

    initOption(data: any) {
        const xAxis = [];
        const data1 = [];
        const data2 = [];
        data.retList.forEach(function (d) {
            xAxis.push(d.orgName);
            data1.push(d.cdmAmt);
            data2.push(d.cwdAmt);
        });
        this.option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['存款', '取款'],
                right: 10,
                top: 10,
                textStyle: {
                    color: '#fff'
                }
            },
            color: ['#3398DB', '#B6A2DE', '#5AB1EF', '#FFB980'],
            xAxis: [
                {
                    type: 'category',
                    data: xAxis,
                    color: '#2D8EC5',
                    show: false
                }
            ],
            yAxis: {
                // name: '单位(百万)',
                type: 'value',
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
                // splitLine: {
                //     show: false, // 去除网格线
                //     splitArea: {
                //         areaStyle: {
                //             color: '#2D8EC5'
                //         }
                //     }
                // },
                // splitArea: {
                //     show: true,
                //     areaStyle: {
                //         color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                //     }
                // }
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
                    type: 'bar',
                    data: data1
                },
                {
                    name: '存款金额',
                    type: 'bar',
                    data: data2
                }
            ]
        };

    }


    // todo:销毁echarts实例，否则轮播的时间越长，实例化的echarts的对象也多，导致内存泄漏、溢出
    ngOnDestroy() {
        console.log('注销饼图组件');
    }
}
