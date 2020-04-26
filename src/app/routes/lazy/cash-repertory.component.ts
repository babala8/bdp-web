import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';

/**
 *  split组件使用方式，请参见angular-split
 */
@Component({
    // language=HTML
    selector: 'cash-repertory',
    template: `
        <as-split [disabled]="true" gutterColor="transparent" (dragEnd)="onDragEnd($event)">
            <as-split-area class="container">
                <div nz-row class="canvas" [ngClass]="{'transform':flippedLeft}" (click)="flippedLeft = !flippedLeft">
                    <ul class="front">
                        <li style="margin-bottom: 4px;">
                            <span style="font-size: 18px;">现金库存</span>
                            <span
                                style="font-size: 14px;">({{displayInfo?.orgName == '总行' ? '全行' : displayInfo?.orgName}}
                                )</span>
                        </li>
                        <li>
                            <span style="display: block;font-size: 38px;">
                                {{(displayInfo?.cashStock / 10000).toFixed(2)}}万元
                            </span>
                            <!--<span class="sequential-number" *ngFor="let item of cashStock.integerList">{{item}}</span>-->
                            <!--<div class="sequential-point"></div>-->
                            <!--<span class="sequential-number" *ngFor="let item of cashStock.decimalList">{{item}}</span>-->
                            <!--<div class="sequential-symbol">-->
                            <!--<span class="sequential-symbol-span">%</span>-->
                            <!--</div>-->
                            <!--<img-->
                            <!--class="sequential-img"-->
                            <!--[src]="cashStock.rose===1?'./assets/images/screen/Arrow-down.png':'./assets/images/screen/Arrow-up.png'"-->
                            <!--&gt;-->
                        </li>
                        <!--<li style="margin-top: 4px;" class="info-size"><span>当前周期现金库存量：{{cashStock.cashStock / 10000}}-->
                        <!--万元</span></li>-->
                        <li><span class="info-size">上个周期现金库存量：{{(displayInfo?.cashStockOld / 10000).toFixed(2)}}
                            万元</span>
                        </li>
                        <li><span style="font-size: 16px;">{{additional}}</span></li>
                        <li><span style="display: block;font-size: 16px;">统计时间：{{statsDate}}</span></li>
                        <!--<li><span>{{cashStock.rose===1?'同比下降：':'同比增长：'}}{{cashStock.additional}}%</span></li>-->
                    </ul>
                    <div class="back">
                        <span class="optionTitle" style="color: #2D8EC5">现金库存</span>
                        <div class="echarts" echarts [options]="cashStockForLineOption"></div>
                    </div>
                </div>
            </as-split-area>

            <as-split-area class="container">
                <div nz-row class="canvas" [ngClass]="{'transform':flippedRight}"
                     (click)="flippedRight = !flippedRight;getOrgTransHisById(displayInfo2.orgName,displayInfo2.orgNo)">
                    <ul class="front">
                        <li style="margin-bottom: 4px;"><span style="font-size: 18px;">现金收付量(排名前十)</span></li>
                        <li>
                            <span style="display: block;font-size: 12px">{{displayInfo2?.orgName}}</span>
                        </li>
                        <li style="margin-top: 4px;" class="info-size">
                            <span style="display: block;font-size: 38px;">{{(displayInfo2?.flowAmt / 10000).toFixed(2)}}
                                万元</span>
                        </li>
                        <li>
                            <span
                                style="display: block;font-size: 16px;">存款金额:{{(displayInfo2?.cwdAmt / 10000).toFixed(2)}}
                                万元</span>
                        </li>
                        <li>
                            <span
                                style="display:block;font-size: 16px;">取款金额：{{(displayInfo2?.cdmAmt / 10000).toFixed(2)}}
                                万元</span>
                        </li>
                        <!--<li><span>{{cashStock.rose===1?'同比下降：':'同比增长：'}}{{cashStock.additional}}%</span></li>-->
                    </ul>
                    <div class="back">
                        <!--<span class="optionTitle" style="color: #2D8EC5">历史库存趋势</span><br>-->
                        <!--<span  style="color: #2D8EC5;font-size: 8px">({{displayInfo2.orgName}})</span>-->
                        <div class="echarts" echarts [options]="option"></div>
                    </div>
                </div>
            </as-split-area>
        </as-split>
    `,
    // language=CSS
    styles: [`
        .container {
            position: relative;
            perspective: 1500px;
        }

        .canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: 50% 50% 0;
            transform-style: preserve-3d;
        }

        .canvas .front {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            z-index: 2;
            transition: transform 1s ease 0s;
        }

        .canvas .back {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            backface-visibility: hidden;
            transform: rotateY(180deg);
            transition: transform 1s ease 0s;
        }

        .canvas .back .echarts {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
        }

        .canvas .back .optionTitle {
            position: absolute;
            top: 10px;
            left: 35px;
            color: #fff;
            font-size: 17px;
        }

        .canvas.transform .front {
            transform: rotateY(180deg);
        }

        .canvas.transform .back {
            transform: rotateY(360deg);
        }

        ul {
            color: #fff;
            position: absolute;
            left: calc(50% - 120px); /* 106px为ul元素宽度/2  */
            top: calc(50% - 67px);
            font-size: 16px;
        }

        /*环比样式*/
        .sequential-number {
            display: inline-block;
            width: 34px;
            height: 50px;
            line-height: 50px;
            margin-right: 5px;
            font-size: 55px;
            text-align: center;
            font-weight: 600;
            background-color: rgba(77, 166, 220, 0.18);
        }

        .sequential-symbol {
            display: inline-block;
            position: relative;
            width: 34px;
            height: 50px;
            line-height: 50px;
            margin-right: 5px;
            vertical-align: -3px;
            background-color: rgba(77, 166, 220, 0.18);
        }

        .sequential-point {
            display: inline-block;
            height: 8px;
            width: 8px;
            background-color: white;
            margin-right: 4px;
            margin-left: -4px;
            margin-bottom: -1px;
        }

        .sequential-symbol-span {
            position: absolute;
            bottom: -8px;
            left: 3px;
            font-size: 27px;
            text-align: center;
            font-weight: 600;
        }

        .sequential-img {
            margin-top: -37px;
        }

        .info-size {
            font-size: 14px;
        }
    `]
})
export class CashRepertoryComponent implements OnInit {

    flippedRight = false;
    flippedLeft = false;
    leftLoding = true;
    cashStock: any = {};
    cashStockForLine = {
        stDate: [],
        cashStock: []
    };
    serviceQuality: any = {};
    cashStockForLineOption: any = {};

    //////
    displayInfo: any;
    additional: any;
    statsDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

    ////////
    // additional2: any;
    displayInfo2: any;
    option: any;

    constructor(private service: LazyService,
                private session: SessionService) {
    }

    ngOnInit() {
        this.mode_getCashStock();
        this.model_cash_line();
        this.mode_rank_css();

        // this.getCashStockByOrgNo();
        // this.getCashStockHisByOrgNo();
        // this.qryOrgTransAmtRanking();
    }

    // model 查询现金
    mode_getCashStock() {
        const data = {
            'element': {
                'cashStock': 348197550,
                'orgNo': '000000000',
                'cashStockOld': 375233550,
                'orgName': '某某分行'
            }, 'retCode': '00', 'retMsg': '查询网点现金库存成功'
        };
        const displayInfo = this.displayInfo = data.element;
        const dValue = displayInfo.cashStock - displayInfo.cashStockOld;
        if (displayInfo.cashStockOld !== 0) {
            if (dValue >= 0) {
                this.additional = '环比增长: ' + (dValue * 100 / displayInfo.cashStockOld).toFixed(2) + '%';
            } else {
                this.additional = '环比下降: ' + (-dValue * 100 / displayInfo.cashStockOld).toFixed(2) + '%';
            }
        } else {
            this.additional = '环比增长: ' + '--';
        }


    }

    model_cash_line() {
        const data = {
            'retCode': '00',
            'retList': [{'cashStock': 373887301, 'statDate': '2018-06-01'}, {
                'cashStock': 365664568,
                'statDate': '2018-06-02'
            }, {'cashStock': 386890150, 'statDate': '2018-06-03'}, {
                'cashStock': 404775685,
                'statDate': '2018-06-04'
            }, {'cashStock': 403354701, 'statDate': '2018-06-05'}, {
                'cashStock': 408567850,
                'statDate': '2018-06-06'
            }, {'cashStock': 399904884, 'statDate': '2018-06-07'}, {
                'cashStock': 384088500,
                'statDate': '2018-06-08'
            }, {'cashStock': 380514450, 'statDate': '2018-06-09'}, {
                'cashStock': 390061335,
                'statDate': '2018-06-10'
            }, {'cashStock': 399208000, 'statDate': '2018-06-11'}, {
                'cashStock': 385086568,
                'statDate': '2018-06-12'
            }, {'cashStock': 390032968, 'statDate': '2018-06-13'}, {
                'cashStock': 366958118,
                'statDate': '2018-06-14'
            }, {'cashStock': 361759484, 'statDate': '2018-06-15'}, {
                'cashStock': 351302468,
                'statDate': '2018-06-16'
            }, {'cashStock': 366717300, 'statDate': '2018-06-17'}, {
                'cashStock': 407296334,
                'statDate': '2018-06-18'
            }, {'cashStock': 425043600, 'statDate': '2018-06-19'}, {
                'cashStock': 419471384,
                'statDate': '2018-06-20'
            }, {'cashStock': 402356200, 'statDate': '2018-06-21'}, {
                'cashStock': 391506001,
                'statDate': '2018-06-22'
            }, {'cashStock': 383690413, 'statDate': '2018-06-23'}, {
                'cashStock': 402683149,
                'statDate': '2018-06-24'
            }, {'cashStock': 416228800, 'statDate': '2018-06-25'}, {
                'cashStock': 412780050,
                'statDate': '2018-06-26'
            }, {'cashStock': 403859218, 'statDate': '2018-06-27'}, {
                'cashStock': 384029400,
                'statDate': '2018-06-28'
            }, {'cashStock': 375233550, 'statDate': '2018-06-29'}, {'cashStock': 348197550, 'statDate': '2018-06-30'}],
            'retMsg': '查询机构现金库存历史成功!'
        };
        const xAxisData = [];
        const seriesData = [];
        data.retList.forEach(function (value, index) {
            xAxisData.push(value.statDate);
            seriesData.push(value.cashStock);
        });
        this.initCashStockForLineOption();

        this.cashStockForLineOption.loading = false;
        this.cashStockForLineOption.xAxis[0].data = xAxisData;
        this.cashStockForLineOption.series[0].data = seriesData;
    }

    mode_rank_css() {
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
        const tem = data.retList;
        this.displayInfo2 = tem[0];
        // const diff = info.benefitIndex - info.benefitIndexOld;
        //
        // if (info.benefitIndexOld !== 0) {
        //     if (diff >= 0) {
        //         this.additional2 = '环比增长: ' + (diff / info.benefitIndexOld * 100).toFixed(2) + '%';
        //     } else {
        //         this.additional2 = '环比下降: ' + (-diff * 100 / info.benefitIndexOld).toFixed(2) + '%';
        //     }
        // } else {
        //     this.additional2 = '环比增长: ' + '--';
        // }
        let index = 1;
        setInterval(() => {
            if (index < tem.length) {
                index++;
                this.displayInfo2 = tem[index];
            } else {
                index = 0;
            }
        }, 1000);

    }

    model_rank_line(orgName) {
        const data = {
            'retCode': '00',
            'retList': [{'transDate': '2018-12-01', 'cwdAmt': 1862100, 'cdmAmt': 2119200}, {
                'transDate': '2018-12-02',
                'cwdAmt': 1889300,
                'cdmAmt': 1717100
            }, {'transDate': '2018-12-03', 'cwdAmt': 2030300, 'cdmAmt': 1988600}, {
                'transDate': '2018-12-04',
                'cwdAmt': 1784200,
                'cdmAmt': 1733400
            }, {'transDate': '2018-12-05', 'cwdAmt': 2081600, 'cdmAmt': 1626400}, {
                'transDate': '2018-12-06',
                'cwdAmt': 1984700,
                'cdmAmt': 1852000
            }, {'transDate': '2018-12-07', 'cwdAmt': 1818100, 'cdmAmt': 1762500}, {
                'transDate': '2018-12-08',
                'cwdAmt': 2321700,
                'cdmAmt': 2516500
            }, {'transDate': '2018-12-09', 'cwdAmt': 2042700, 'cdmAmt': 1721700}, {
                'transDate': '2018-12-10',
                'cwdAmt': 2263800,
                'cdmAmt': 2210500
            }, {'transDate': '2018-12-11', 'cwdAmt': 2363200, 'cdmAmt': 2054700}, {
                'transDate': '2018-12-12',
                'cwdAmt': 2132800,
                'cdmAmt': 1730300
            }, {'transDate': '2018-12-13', 'cwdAmt': 1832900, 'cdmAmt': 1625800}, {
                'transDate': '2018-12-14',
                'cwdAmt': 1874500,
                'cdmAmt': 1628500
            }, {'transDate': '2018-12-15', 'cwdAmt': 2047300, 'cdmAmt': 2023100}, {
                'transDate': '2018-12-16',
                'cwdAmt': 2111600,
                'cdmAmt': 1830600
            }, {'transDate': '2018-12-17', 'cwdAmt': 2256000, 'cdmAmt': 2075000}, {
                'transDate': '2018-12-18',
                'cwdAmt': 2283800,
                'cdmAmt': 2737900
            }, {'transDate': '2018-12-19', 'cwdAmt': 2027200, 'cdmAmt': 1849400}, {
                'transDate': '2018-12-20',
                'cwdAmt': 1995600,
                'cdmAmt': 2176600
            }, {'transDate': '2018-12-21', 'cwdAmt': 2158600, 'cdmAmt': 2302500}, {
                'transDate': '2018-12-22',
                'cwdAmt': 2316200,
                'cdmAmt': 1734600
            }, {'transDate': '2018-12-23', 'cwdAmt': 2148800, 'cdmAmt': 1637100}, {
                'transDate': '2018-12-24',
                'cwdAmt': 2247800,
                'cdmAmt': 2070300
            }, {'transDate': '2018-12-25', 'cwdAmt': 2313100, 'cdmAmt': 2464500}, {
                'transDate': '2018-12-26',
                'cwdAmt': 2205400,
                'cdmAmt': 1836000
            }],
            'retMsg': '查询网点现金收付量成功'
        };
        const xAxisData = [];
        const seriesData1 = [];
        const seriesData2 = [];
        data.retList.forEach(function (value, index) {
            xAxisData.push(value.transDate);
            seriesData1.push(value.cdmAmt);
            seriesData2.push(value.cwdAmt);
        });
        this.initOption();

        this.option.loading = false;
        this.option.xAxis[0].data = xAxisData;
        this.option.series[0].data = seriesData1;
        this.option.series[1].data = seriesData2;
        console.log(this.option);
        this.option.title.text = '网点现金收付量 (' + orgName + ')';
    }

    // 查询现金
    getCashStockByOrgNo() {
        const params = {orgNo: this.session.orgNo};
        this.service.getCashStockByOrgNo(params).subscribe(data => {
            const displayInfo = this.displayInfo = data.entity;
            const dValue = displayInfo.cashStock - displayInfo.cashStockOld;
            if (displayInfo.cashStockOld !== 0) {
                if (dValue >= 0) {
                    this.additional = '环比增长: ' + (dValue * 100 / displayInfo.cashStockOld).toFixed(2) + '%';
                } else {
                    this.additional = '环比下降: ' + (-dValue * 100 / displayInfo.cashStockOld).toFixed(2) + '%';
                }
            } else {
                this.additional = '环比增长: ' + '--';
            }
        });
    }

    // 查现金线图
    getCashStockHisByOrgNo() {
        const params = {orgNo: this.session.orgNo};
        this.service.getCashStockHisByOrgNo(params).subscribe(data => {
            const xAxisData = [];
            const seriesData = [];
            data.retList.forEach(function (value, index) {
                xAxisData.push(value.statDate);
                seriesData.push(value.cashStock);
            });
            this.initCashStockForLineOption();
            this.cashStockForLineOption.loading = false;
            this.cashStockForLineOption.xAxis[0].data = xAxisData;
            this.cashStockForLineOption.series[0].data = seriesData;
        });
    }

    // 查询现金收付量
    qryOrgTransAmtRanking() {
        const params = {orgNo: this.session.orgNo, index: 1};
        this.service.qryOrgTransAmtRanking(params).subscribe(data => {
            const temp = data.retList;
            this.displayInfo2 = temp[0];
            let index = 1;
            const that = this;
            const interval = setInterval(function () {
                if (index < temp.length) {
                    index++;
                    that.displayInfo2 = temp[index];
                } else {
                    index = 0;
                }
            }, 6000);
        });
    }

    // 查询收付量线图
    getOrgTransHisById(orgName, orgNo) {
        const params = {orgNo: orgNo};
        this.service.getOrgTransHisById(params).subscribe(data => {
            const xAxisData = [];
            const seriesData1 = [];
            const seriesData2 = [];
            data.retList.forEach(function (value, index) {
                xAxisData.push(value.transDate);
                seriesData1.push(value.cdmAmt);
                seriesData2.push(value.cwdAmt);
            });
            this.initOption();
            this.option.loading = false;
            this.option.xAxis[0].data = xAxisData;
            this.option.series[0].data = seriesData1;
            this.option.series[1].data = seriesData2;
            this.option.title.text = '网点现金收付量 (' + orgName + ')';
        });
    }


    // 查询当前设备余钞量
    // getCashStockByOrg() {
    //     const params = {orgNo: this.session.orgNo};
    //     this.service.getCashStockByOrg(params).subscribe((_data) => {
    //         console.log('前余钞量')
    //         this.cashStock = _data.elemsnt;
    //         this.chainRatio(this.cashStock.cashStock, this.cashStock.cashStockOld, this.cashStock);
    //         this.leftLoding = false;
    //         console.log(this.cashStock)
    //     })
    // }
    //
    // // 根据机构号查询服务质量
    // getServiceQualityByOrgNo() {
    //     const params = {orgNo: this.session.orgNo}
    //     this.service.getServiceQualityByOrgNo(params).subscribe((_data) => {
    //         console.log('服务质量');
    //         this.serviceQuality = _data.retData;
    //         this.chainRatio(this.serviceQuality.serviceQuality, this.serviceQuality.serviceQualityOld, this.serviceQuality);
    //         console.log(this.serviceQuality)
    //     })
    // }
    //
    // // 查询设备历史余钞量（近7天）
    // getCashStockByOrgForLine() {
    //     const params = {orgNo: this.session.orgNo};
    //     this.service.getCashStockByOrgForLine(params).subscribe((_data) => {
    //         console.log('历史余钞')
    //         _data.retList.forEach((val) => {
    //             this.cashStockForLine.stDate.push(val.stDate);
    //             if (val.cashStock != 0) {
    //                 val.cashStock = (val.cashStock / 10000).toFixed(1);
    //             }
    //             this.cashStockForLine.cashStock.push(val.cashStock);
    //         });
    //         console.log(this.cashStockForLine);
    //         this.initCashStockForLineOption();
    //     })
    // }
    //
    // // 计算同比，同时把环比数分割成整数、小数数组
    // chainRatio(cashStock, cashStockOld, serviceQuality) {
    //     const dValue = cashStock - cashStockOld;
    //     if (dValue > 0) {
    //         serviceQuality.rose = 0;
    //         serviceQuality.additional = (dValue * 100 / cashStockOld ).toFixed(2);
    //     } else if (dValue < 0) {
    //         serviceQuality.rose = 1;
    //         serviceQuality.additional = (-dValue * 100 / cashStockOld).toFixed(2);
    //     } else {
    //         serviceQuality.rose = 2;
    //         serviceQuality.additional = '--';
    //     }
    //
    //     // 拆分环比数据,整数放入integerList,小数放入decimalList
    //     if (serviceQuality.rose <= 1) {
    //         serviceQuality.integerList = serviceQuality.additional.toString().split('.')[0].split('');
    //         serviceQuality.decimalList = serviceQuality.additional.toString().split('.')[1].split('');
    //     } else {
    //         serviceQuality.integerList = [0];
    //         serviceQuality.decimalList = [0, 0];
    //     }
    // }

    initCashStockForLineOption() {
        this.cashStockForLineOption = {
            loading: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
            }],
            yAxis: {
                name: '单位(万)',
                type: 'value',
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
                splitLine: {
                    show: false, // 去除网格线
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                    }
                }
            },
            series: [
                {
                    name: '余钞量',
                    data: [],
                    type: 'line'
                }
            ],
            grid: {
                left: 40,
                top: 59,
                bottom: 15,
                containLabel: true
            },
            color: ['#00CACA']
        };
    }

    initOption() {
        this.option = {
            loading: true,
            title: {
                text: '网点现金收付量',
                color: 'white'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
            }],
            yAxis: {
                name: '单位(万)',
                type: 'value',
                axisLine: {
                    lineStyle: {
                        // 设置y轴颜色
                        color: '#2D8EC5'
                    }
                },
                splitLine: {
                    show: false, // 去除网格线
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                    }
                }
            },
            series: [
                {
                    name: '网点现金取款',
                    type: 'line',
                    stack: '网点现金取款',
                    data: []
                },
                {
                    name: '网点现金存款',
                    type: 'line',
                    stack: '网点现金存款',
                    data: []
                }
            ],
            grid: {
                left: 40,
                top: 59,
                bottom: 15,
                containLabel: true
            },
            color: ['#00CACA']
        };
    }

    onDragEnd(e: { gutterNum: number, sizes: Array<number> }) {
        // Set size for all visible columns
        console.log(e);
    }

}
