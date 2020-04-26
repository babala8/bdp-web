import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AddnotesPlanService } from '../../addnotes-plan.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { AnalysisDevComponent } from './analysis-addnotes-dev/analysis-dev.component';
import { SYS_CONS } from '../../../../../../models/constant';
import { SessionService } from '@core';
import { AppService } from 'app/app.service';

@Component({
    selector: 'adjust-atms',
    templateUrl: './adjust-atms.html',
})

export class AdjustAtmsComponent implements OnInit {

    @ViewChild('myInput') myInput: ElementRef;

    addnotesPlanNo: string;
    detail: any = {};
    dataSet = [];
    loading;
    loading_operating = false;
    canGroup = false;
    radioValue;
    chooseId = null;
    type = null;
    states = SYS_CONS.STATE.ADDNOTE_PLAN;

    constructor(
        private nzModal: NzModalService,
        private message: NzMessageService,
        private session: SessionService,
        private appService: AppService,
        private service: AddnotesPlanService
    ) { }

    ngOnInit() { }

    @Input()
    set planNo(planNo: string) {
        this.addnotesPlanNo = planNo;

        this.loading = true;
        this.service.detail(this.addnotesPlanNo).subscribe(
            _data => {
                if (_data.element.addnotesPlan.status < this.states[2].value) {
                    this.cashReqAmt();
                    return;
                }
                this.loading = false;
                this.canGroup = true;
                this.detail = _data.element.addnotesPlan;
                this.detail['planAddnotesAmt'] = parseInt(this.detail['planAddnotesAmt'], 10) / 10000;
                this.separateMode(this.detail['clrCenterNo']);
                this.dataSet = _data.element.detailList;
                if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.DYNAMIC) {
                    this.dataSet.sort(this.sequenceByOrgNo);
                }
                this.dataSet.forEach(data => {
                    data['planAddnotesAmt'] = parseInt(data['planAddnotesAmt'], 10) / 10000;
                    Object.assign(data,{
                        useDays_old: data.useDays
                    });
                });
            },
            error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }

    daysShowFlag = false;
    separateMode(clrCenterNo) {
        this.service.getAddNoteMode(clrCenterNo).subscribe(
            result => {
                this.service.ADDNOTE_MODE = result.paramValue || SYS_CONS.ADDNOTE_MODE.FIX;
                if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
                    this.daysShowFlag = false;
                }else if(this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.DYNAMIC){
                    this.daysShowFlag = true;
                }
            }
        );
    }

    sequenceByOrgNo(a, b) {
        if (a.orgName > b.orgName) {
            return 1;
        } else if (a.orgName < b.orgName) {
            return -1;
        } else {
            return 0;
        }
    }

    cashReqAmt() {
        const devList = [];
        this.dataSet.forEach(item => {
            if(item.useDays_old !== item.useDays){
                devList.push(item);
            }
        });
        const params = { addnotesPlanNo: this.addnotesPlanNo};
        this.loading = true;

        this.service.addnotesPlanCashReqAmt(params).subscribe(_data => {
            this.loading = false;
            this.canGroup = true;
            this.detail = _data.element.addnotesPlan;
            this.detail['planAddnotesAmt'] = parseInt(this.detail['planAddnotesAmt'], 10) / 10000;
            this.separateMode(this.detail.clrCenterNo);
            this.dataSet = _data.element.detailList;
            if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.DYNAMIC) {
                this.dataSet.sort(this.sequenceByOrgNo);
            }
            this.dataSet.forEach(data => {
                data['planAddnotesAmt'] = parseInt(data['planAddnotesAmt'], 10) / 10000;
                Object.assign(data, {
                    useDays_old: data.useDays
                });
            });
            this.message.success('金额预测成功！');
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    modify() {
        this.loading_operating = true;
        this.service.modAddnotesPlanAmts({
            addnotesPlanNo: this.addnotesPlanNo,
            modOpNo: this.session.userId,
            devList: this.dataSet.map(item => {
                return { devNo: item['devNo'], planAddnotesAmt: item['planAddnotesAmt'] * 10000 };
            })
        }).subscribe(_data => {
            ++this.service.step;
        }, (error) => {
            this.loading_operating = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    // 点击单选框以外执行此事件，单选框、输入框失去焦点
    clickThing($event) {
        if ($event.target.id !== 'onchangValue' && $event.target.nodeName !== 'path' && $event.target.nodeName !== 'svg' && (this.chooseId==0 || !!this.chooseId)) {
            this.onblurText(this.chooseId);
            this.chooseId = null;
        }
    }

    // 移出输入框时，计算加钞总金额
    onblurText(i) {
        this.dataSet[i]["planAddnotesAmt"] = _.round(_.toNumber(this.dataSet[i]["planAddnotesAmt"]), 2);
        let planAddnotesAmt = 0;
        this.dataSet.forEach(data => {
            planAddnotesAmt = _.add(planAddnotesAmt, data["planAddnotesAmt"]);
        });
        this.detail.planAddnotesAmt = planAddnotesAmt;
        this.chooseId = null;
    }

    // 设置编辑图片选中设备的Id
    chooseInput(chooseId, type) {
        if(!_.isNull(this.chooseId)){
            this.onblurText(this.chooseId);
        }
        this.type = type;
        this.chooseId = chooseId;

        // setTimeout(()=>{ 
        //     this.myInput.nativeElement.
        // },0);
    }

    lastKey = '';
    clearNoNum(target) {
        const value = String(target.value), key = target.key;
        if (key.length > 1) {
            return true;
        }
        if ('01234567890.'.indexOf(key) == -1) {
            return false;
        }
        if (this.lastKey == '\.' && key == '\.') {
            return false;
        }
        if (value.indexOf('\.') != -1 && key == '\.') {
            return false;
        }
        this.lastKey = key;
    }

    dataFormat(event, i) {
        if(event.key == 'Enter') {
            this.onblurText(i);
            return;
        }
        if(_.isNull(this.dataSet[i]["planAddnotesAmt"])) return;
        this.dataSet[i]["planAddnotesAmt"] = _.round(this.dataSet[i]["planAddnotesAmt"], 2);
    }

    openAnalysis(itms){
        const analysisModal = this.nzModal.create({
            nzTitle: '加钞设备分析',
            nzFooter: null,
            nzWidth: '80%',
            nzZIndex: 2000,
            nzContent: AnalysisDevComponent,
            nzComponentParams: {
                devInfo: itms,
                planAddnotesDate: this.detail.planAddnotesDate
            },
            nzOnOk: () => {
            },
            nzOnCancel: () => {
            },
        });
    }
}
