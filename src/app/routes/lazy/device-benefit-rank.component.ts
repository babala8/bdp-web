import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';
import {PrepService} from './prep.service';
import {Communicate} from './communicate';

/**
 * perfect-scrollbar组件使用方式参见：ngx-perfect-scrollbar
 */

@Component({
    selector: 'device-benefit-rank-component',
    // language=HTML
    template: `
        <span class="title">设备加钞量排名<span style="font-size: 12px">(近31天)</span></span>
        <div class="clearfix button-line">
            <button class="button btn-later"
                    [ngClass]="{'btn-later-selected':selectedButton===2}"
                    (click)="tail()"
            ></button>
            <button class="button btn-top"
                    [ngClass]="{'btn-top-selected':selectedButton===1}"
                    (click)="top()"
            ></button>
        </div>
        <div class=" wrapper-of-scrollbar">
            <perfect-scrollbar>
                <div nz-row style="height: 36px;line-height: 36px;">
                    <div nz-col style="text-align: right;padding-right: 8px" [nzSpan]="4">排名</div>
                    <div nz-col style="text-align: center" [nzSpan]="5" [nzOffset]="1">设备编号</div>
                    <div nz-col style="text-align: center" [nzSpan]="13">网点机构</div>
                </div>
                <div nz-row [nzGutter]="8" class="list-item" *ngFor="let item of devList">
                    <div (click)="qryDetail(item.devNo)">
                        <div nz-col [nzSpan]="4" style="padding-top: 6px;text-align: right;">
                            <img src="./assets/images/screen/{{item.sortNo}}.png" alt="">
                        </div>
                        <div nz-col class="info" [nzSpan]="5" [nzOffset]="1">
                            <strong>{{item.devNo}}</strong>
                        </div>
                        <div nz-col class="info" [nzSpan]="14">
                            <p [class.text-deleted]="item.completed" class="mb0">{{item.orgName}}</p>
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
        </div>

    `,
    // language=CSS
    styles: [`

        .title {
            position: absolute;
            top: -10px;
            left: 15px;
            font-size: 17px;
            background-repeat: no-repeat;
            background-image: url(./assets/images/screen/icon_sort.png);
            background-size: 26px 16px;
            color: #3F82AC;
            background-position: 3px 5px;
            text-indent: 35px;
        }

        div.wrapper-of-scrollbar {
            width: 100%;
            height: calc(100% - 69px);
            color: #23F1CE;
        }

        div.list-item {
            margin-top: 2px;
            margin-bottom: 4px;
            width: 100%;
            /*color: #23F1CE;*/
        }

        div.list-item:hover {
            background-color: #23527c;
            cursor: pointer;

        }

        .info {
            text-align: center;
            line-height: 38px;
        }

        .clearfix:after {
            display: block;
            content: '';
            clear: both;
        }

        .button-line {
            height: 30px;
            margin-top: 20px;
        }

        .button {
            outline: none;
            float: right;
            height: 25px;
            width: 85px;
            margin-right: 8px;
            border: none;
            background-color: rgba(1, 1, 10, 0);
        }

        .btn-top {
            background-image: url(./assets/images/screen/btn-Top-ten.png);
        }

        .btn-top-selected {
            background-image: url(./assets/images/screen/btn-Top-ten--selected.png);
        }

        .btn-later {
            background-image: url(./assets/images/screen/btn-Later-ten.png);
        }

        .btn-later-selected {
            background-image: url(./assets/images/screen/btn-Later-ten-selected.png);
        }
    `]
})
export class DeviceBenefitRankComponent implements OnInit {

    devList;
    topDevList;
    tailDevList;
    // 0.都未选中 1.选中前十状态  2.选中后十状态
    selectedButton = 0;

    constructor(private service: LazyService,
                private propService: PrepService,
                private session: SessionService) {
    }

    ngOnInit() {
        this.modelTop10();
       this.top();
       this.modeTail10();
       //  this.qryTopRanking();
       //  this.qryTailRanking();
       //  this.top();
    }

    modelTop10() {
        const data = {
            'retCode': '00',
            'retList': [{
                'devNo': '44022857',
                'addAmt': 13600000,
                'orgNo': '0230700346',
                'sortNo': '1',
                'orgName': '某简阳天津路支行附行式自助银行'
            }, {
                'devNo': '44021093',
                'addAmt': 12000000,
                'orgNo': '0440201729',
                'sortNo': '2',
                'orgName': '某双流龙灯山路支行附行式自助银行'
            }, {
                'devNo': '44020803',
                'addAmt': 11000000,
                'orgNo': '0440201454',
                'sortNo': '3',
                'orgName': '某青龙昭觉横街分理处附行式自助银行'
            }, {
                'devNo': '44022719',
                'addAmt': 10800000,
                'orgNo': '0440200698',
                'sortNo': '4',
                'orgName': '某东大黄田坝支行附行式自助银行'
            }, {
                'devNo': '44022720',
                'addAmt': 10800000,
                'orgNo': '0440200698',
                'sortNo': '5',
                'orgName': '某东大黄田坝支行附行式自助银行'
            }, {
                'devNo': '44021852',
                'addAmt': 10400000,
                'orgNo': '0440201663',
                'sortNo': '6',
                'orgName': '某芷泉万科路支行附行式自助银行'
            }, {
                'devNo': '44021609',
                'addAmt': 10400000,
                'orgNo': '0440200816',
                'sortNo': '7',
                'orgName': '某春熙晨晖路分理处附行式自助银行'
            }, {
                'devNo': '44020933',
                'addAmt': 10400000,
                'orgNo': '0440201668',
                'sortNo': '8',
                'orgName': '某东大贝森南路支行自助银行'
            }, {
                'devNo': '44021228',
                'addAmt': 10200000,
                'orgNo': '0440201833',
                'sortNo': '9',
                'orgName': '某春熙青石桥自助银行'
            }, {
                'devNo': '44021129',
                'addAmt': 10200000,
                'orgNo': '0440202244',
                'sortNo': '10',
                'orgName': '某双流机场T1航站楼2楼自助银行'
            }],
            'retMsg': '查询机构加钞量成功'
        };
        this.topDevList = data.retList;
        this.devList = this.topDevList;
    }

    modeTail10() {
        const data = {
            'retCode': '00',
            'retList': [{
                'devNo': '44021118',
                'addAmt': 200000,
                'orgNo': '0440202265',
                'sortNo': '1',
                'orgName': '某双流公兴纬创D7生活区自助银行'
            }, {
                'devNo': '44021165',
                'addAmt': 200000,
                'orgNo': '0440202668',
                'sortNo': '2',
                'orgName': '某郫县四川科技职业学院自助银行'
            }, {
                'devNo': '44021117',
                'addAmt': 200000,
                'orgNo': '0440202265',
                'sortNo': '3',
                'orgName': '某双流公兴纬创D7生活区自助银行'
            }, {
                'devNo': '44021840',
                'addAmt': 250000,
                'orgNo': '0440202226',
                'sortNo': '4',
                'orgName': '某崇州社保局自助银行'
            }, {
                'devNo': '44021542',
                'addAmt': 300000,
                'orgNo': '0440202729',
                'sortNo': '5',
                'orgName': '某郫县犀浦镇高等纺织专科学院自助银行'
            }, {
                'devNo': '44021930',
                'addAmt': 300000,
                'orgNo': '0440200904',
                'sortNo': '6',
                'orgName': '某温江海峡科技园自助自助服务区'
            }, {
                'devNo': '44021584',
                'addAmt': 300000,
                'orgNo': '0440202951',
                'sortNo': '7',
                'orgName': '某崇州77115部队超市自助银行'
            }, {
                'devNo': '44021062',
                'addAmt': 300000,
                'orgNo': '0440201975',
                'sortNo': '8',
                'orgName': '某青白江技师学院青白江分院自助银行'
            }, {
                'devNo': '44020987',
                'addAmt': 300000,
                'orgNo': '0440201957',
                'sortNo': '9',
                'orgName': '某郫县川师大某学院助银行'
            }, {
                'devNo': '44021115',
                'addAmt': 400000,
                'orgNo': '0440202671',
                'sortNo': '10',
                'orgName': '某双流公兴街道纬创D5自助银行'
            }],
            'retMsg': '查询机构加钞量成功'
        };
        this.tailDevList = data.retList;

    }
    // 前10
    qryTopRanking() {
        const params = {orgNo: this.session.orgNo, index: 1, subject: 'devBenefit'};
        this.service.getAddCashAmtRanking(params).subscribe((_data) => {
            this.topDevList = _data.retList;
            this.devList = this.topDevList;
        });
    }

    // 后10
    qryTailRanking() {
        const params = {orgNo: this.session.orgNo, index: 2, subject: 'devBenefit'};
        this.service.getAddCashAmtRanking(params).subscribe((_data) => {
            this.tailDevList = _data.retList;
        });
    }

    qryDetail(devNo) {
        console.log('修改了值' + devNo);
        // this.propService.changeOrgNo.emit(devNo);
        Communicate.getInstance().changeOrgNo.emit(devNo);

    }

    top() {
        this.selectedButton = 1;
        this.devList = this.topDevList;
    }

    tail() {
        this.selectedButton = 2;
        this.devList = this.tailDevList;
    }
}
