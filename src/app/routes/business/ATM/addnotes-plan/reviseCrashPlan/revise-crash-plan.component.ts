import { Component, OnInit, } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { AddnotesPlanService } from '../addnotes-plan.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import * as moment from 'moment';
import { SYS_CONS } from '../../../../../models/constant';

@Component({
    templateUrl: './revise-crash-plan.html',
    styleUrls: ['./revise-crash-plan.less'],
})

export class ReviseCrashPlanComponent implements OnInit {
    devInitList = [];
    devFilterList = [];
    devList = [];
    planAddnotesDate;
    clrCenterNo;
    detail;
    detailList;
    loading;


    constructor(
        private message: NzMessageService,
        private service: AddnotesPlanService,
        private session: SessionService,
        private subject: NzModalRef
    ) {
    }

    ngOnInit() {
        this.devListInit();
        this.qryDetail();
    }

    qryDetail() {
        this.loading = true;
        this.service.detail(this.addnotesPlanNo)
        .subscribe(_data => {
            this.loading = false;
            this.detail = _data.element.addnotesPlan;
            this.clrCenterNo = _data.element.addnotesPlan.clrCenterNo;
            this.detailList = [
                { name: '计划批次', value: this.detail.addnotesPlanNo },
                { name: '金库', value: this.detail.clrCenterName },
                { name: '加钞日期', value: this.detail.planAddnotesDate },
                { name: '设备台数', value: this.detail.planDevCount },
                { name: '加钞总量(万元)', value: this.detail.planAddnotesAmt / 10000.0 },
                { name: '审核人', value: this.detail.auditOpName },
                { name: '审核时间', value: `${this.detail.auditOpDate  || ''} ${this.detail.auditOpTime || ''}` },
                { name: '审核意见', value: this.detail.refuseSuggestion },
            ];
            this.devList = _data.element.detailList;
            this.devList.forEach(element => {
                Object.assign(element, {
                    predict:true,
                    devNo: element.devNo,
                    orgName: element.orgName,
                    address: element.address,
                    availableAmt: element.availableAmt,
                    notAddCashDays: element.notAddCashDays,
                    reviseAmt: element.planAddnotesAmt/10000,
                });
            });
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    devListInit() {
        const params = {
            clrCenterNo: this.clrCenterNo,
        };
        this.service.getDevInfos(params)
            .subscribe(_data => {
                this.devInitList = _data['retList'];
                this.devInitList.forEach(dev => {
                    this.devFilterList.push(dev);
                });
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    devFilter(devNo) {
        this.devFilterList.splice(0, this.devFilterList.length);
        if (devNo.length < 6) {
            return;
        }
        this.devInitList.forEach(element => {
            if (element.no.indexOf(devNo) !== -1)
                this.devFilterList.push(element);
        });
        if (this.devFilterList.length > 20) {
            this.devFilterList = this.devFilterList.slice(0, 20);
        }
    }

    devAdd() {
        if(this.predictClicked){
            this.predictClicked = false;
        }
        this.devList.forEach(element => {
            if (!element.devNo) {
                this.message.warning("存在未选择的设备信息列！");
                this.devList.pop();
                return;
            }
        });
        let dev = {};
        Object.assign(dev, {
            devNo: null,
            predict: false,
        });
        this.devList.push(dev);
    }

    qryDevInfo(devNo) {
        this.devList.forEach(dev => {
            if (devNo == dev.devNo) {
                this.message.warning(" 该设备已添加,请重新选择！");
                this.devList.pop();
                return;
            }
        })
        this.service.qryInfoOfDev({devNo: devNo})
        .subscribe(_data => {
            this.devList.forEach(element => {
                if (element.devNo == devNo) {
                    element.orgName = _data.element.entity.orgName;
                    element.address = _data.element.entity.address;
                    element.notAddCashDays = _data.element.entity.notAddCashDays;
                    element.availableAmt = _data.element.entity.availableAmt;
                }
            });

        });
    }

    addnotesPlanNo;
    predict_loading = false;
    predictClicked = false;
    predict() {
        this.predictClicked = true;
        this.predict_loading = true;
        this.bindPlanAndDevs();
    }

    bindPlanAndDevs() {
        const params = { modOpNo: this.session.userId, addnotesPlanNo: this.addnotesPlanNo };
        params['devList'] = [...this.devList.uniqBy('devNo')];
        this.service.addnotesPlanDevs(params).subscribe(_data => {
            this.cashReqAmt();
        }, (error) => {
            this.predict_loading = false;
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    cashReqAmt() {
        const params = { addnotesPlanNo: this.addnotesPlanNo};

        this.service.addnotesPlanCashReqAmt(params).subscribe(_data => {
            this.predict_loading = false;
            // this.detail = _data.retData;
            // this.detail['planAddnotesAmt'] = parseInt(this.detail['planAddnotesAmt'], 10) / 10000;
            let dataSet = [];
            dataSet = _data.element.detailList;
            dataSet.forEach(data => {
                this.devList.forEach(dev => {
                    if (dev.devNo == data.devNo && !dev.predict) {
                        dev['predict'] = true;
                        dev['planAddnotesAmt'] = parseInt(data['planAddnotesAmt'], 10) / 10000;
                        dev['reviseAmt'] = dev['planAddnotesAmt'];
                    }
                });
            });
            this.message.success('金额预测成功！');
        }, (error) => {
            this.predict_loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    loading_operating;
    submit() {
        this.modify();
    }

    modify() {
        this.loading_operating = true;
        this.service.modAddnotesPlanAmts({
            addnotesPlanNo: this.addnotesPlanNo,
            modOpNo: this.session.userId,
            devList: this.devList.map(item => {
                return { devNo: item['devNo'], planAddnotesAmt: item['reviseAmt'] * 10000 };
            })
        }).subscribe(_data => {
            this.group();
        }, (error) => {
            this.loading_operating = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    group() {
        const params: any = [];
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['tspFlag'] = 1;
        params['tactic'] = 11;
        params['groupNum'] = 1;
        params['maxNetpointNumOfGroup'] = this.devList.length;
        params['earliestStartTime'] = '08:00:00';
        params['lastestArrivalTime'] = '18:00:00';
        params['groupType'] = SYS_CONS.ADDNOTE_MODE.DYNAMIC;


        this.service.groupTsp(params).subscribe(data => {
            this.submitAudit();
        }, (error) => {
            this.loading_operating = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    submitAudit() {
        this.service.submitAudit({ addnotesPlanNo: this.addnotesPlanNo }).subscribe(
            data => {
                this.loading_operating = false;
                this.message.success(data.retMsg);
                this.subject.triggerOk();
            },
            error => {
                this.loading_operating = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }
}
