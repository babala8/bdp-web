import {Component, OnInit} from '@angular/core';
import {LazyService} from './lazy.service';
import {SessionService} from '../../core/session.service';
import {PrepService} from './prep.service';
import {Communicate} from './communicate';

/**
 * perfect-scrollbar组件使用方式参见：ngx-perfect-scrollbar
 */

@Component({
    selector: 'service-quality-rank',
    // language=HTML
    template: `
        <span class="title">设备收付量排名<span style="font-size: 12px">(近31天)</span></span>
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
export class ServiceQualityRankComponent implements OnInit {

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
        // this.qryTopRanking();
        // this.qryTailRanking();
        // this.top();
        this.modelTop10();
        this.top();
        this.modeTail10();
    }

    modelTop10() {
        const data = {
            'retCode': '00',
            'retList': [{
                'devNo': '44022550',
                'orgNo': '0440201698',
                'sortNo': '1',
                'orgName': '某温江温泉大道支行附行式自助银行',
                'transAmt': 32608700
            }, {
                'devNo': '44022856',
                'orgNo': '0230700346',
                'sortNo': '2',
                'orgName': '某简阳天津路支行附行式自助银行',
                'transAmt': 31144900
            }, {
                'devNo': '44021095',
                'orgNo': '0440201729',
                'sortNo': '3',
                'orgName': '某双流龙灯山路支行附行式自助银行',
                'transAmt': 31142500
            }, {
                'devNo': '44022438',
                'orgNo': '0440202862',
                'sortNo': '4',
                'orgName': '某龙泉北京路北段自助银行',
                'transAmt': 30550700
            }, {
                'devNo': '44022541',
                'orgNo': '0440201446',
                'sortNo': '5',
                'orgName': '某金牛国际商贸城支行附行式自助银行',
                'transAmt': 30225400
            }, {
                'devNo': '44021279',
                'orgNo': '0440201698',
                'sortNo': '6',
                'orgName': '某温江温泉大道支行附行式自助银行',
                'transAmt': 29447300
            }, {
                'devNo': '44022154',
                'orgNo': '0440202061',
                'sortNo': '7',
                'orgName': '某沙河双荆路支行附行式自助银行',
                'transAmt': 28941000
            }, {
                'devNo': '44020311',
                'orgNo': '0440201658',
                'sortNo': '8',
                'orgName': '某双流西南航空港支行附行式自助银行',
                'transAmt': 28334600
            }, {
                'devNo': '44022048',
                'orgNo': '0440200824',
                'sortNo': '9',
                'orgName': '某春熙成龙大道分理处附行式自助银行',
                'transAmt': 27917800
            }, {
                'devNo': '44022046',
                'orgNo': '0440200824',
                'sortNo': '10',
                'orgName': '某春熙成龙大道分理处附行式自助银行',
                'transAmt': 27892500
            }],
            'retMsg': '查询设备现金收付量排名成功'
        };
        this.topDevList = data.retList;
        this.devList = this.topDevList;
    }

    modeTail10() {
        const data = {
            'retCode': '00',
            'retList': [{
                'devNo': '44023007',
                'orgNo': '0440203008',
                'sortNo': '1',
                'orgName': '某大邑子龙街自助银行',
                'transAmt': 0
            }, {
                'devNo': '44023005',
                'orgNo': '0440200700',
                'sortNo': '2',
                'orgName': '某草市罗家碾支行附行式自助银行',
                'transAmt': 0
            }, {
                'devNo': '44023026',
                'orgNo': '0440203004',
                'sortNo': '3',
                'orgName': '某郫县商贸大厦自助银行',
                'transAmt': 0
            }, {
                'devNo': '44023027',
                'orgNo': '0440203004',
                'sortNo': '4',
                'orgName': '某郫县商贸大厦自助银行',
                'transAmt': 0
            }, {
                'devNo': '44023006',
                'orgNo': '0440203008',
                'sortNo': '5',
                'orgName': '某大邑子龙街自助银行',
                'transAmt': 0
            }, {
                'devNo': '44021409',
                'orgNo': '0440200815',
                'sortNo': '6',
                'orgName': '某草市光华大道支行附行式自助银行',
                'transAmt': 0
            }, {
                'devNo': '44021505',
                'orgNo': '0440202910',
                'sortNo': '7',
                'orgName': '某高新二环路南三段（华美紫馨）自助银行',
                'transAmt': 75400
            }, {
                'devNo': '44021117',
                'orgNo': '0440202265',
                'sortNo': '8',
                'orgName': '某双流公兴纬创D7生活区自助银行',
                'transAmt': 80900
            }, {
                'devNo': '44020987',
                'orgNo': '0440201957',
                'sortNo': '9',
                'orgName': '某郫县川师大某学院助银行',
                'transAmt': 111400
            }, {
                'devNo': '44021930',
                'orgNo': '0440200904',
                'sortNo': '10',
                'orgName': '某温江海峡科技园自助自助服务区',
                'transAmt': 164800
            }],
            'retMsg': '查询设备现金收付量排名成功'
        };
        this.tailDevList = data.retList;

    }

    // 前10
    qryTopRanking() {
        const params = {orgNo: this.session.orgNo, index: 1, subject: 'orgServiceQuality'};
        this.service.qryTransAmtRanking(params).subscribe((_data) => {
            this.topDevList = _data.retList;
            this.devList = this.topDevList;
        });
    }

    // 后10
    qryTailRanking() {
        const params = {orgNo: this.session.orgNo, index: 2, subject: 'orgServiceQuality'};
        this.service.qryTransAmtRanking(params).subscribe((_data) => {
            this.tailDevList = _data.retList;
            // // 后十名前三位序号分别设为-1、-2、-3、，以区别前十名前三位
            // this.tailDevList.map((val, index) => {
            //     if (index < 3) {
            //         val.sortNo = -val.sortNo;
            //     }
            // });
            // console.log('___________________');
            // console.log(this.tailDevList);
        });
    }

    qryDetail(devNo) {
        console.log('修改了值' + devNo);
        // this.propService.changeDevNo.emit(devNo);
        Communicate.getInstance().changeDevNo.emit(devNo);
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
