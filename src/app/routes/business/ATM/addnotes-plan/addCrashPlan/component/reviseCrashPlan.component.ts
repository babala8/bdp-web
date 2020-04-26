import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {AddnotesPlanService} from '../../addnotes-plan.service';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {SessionService} from '@core';
import { SYS_CONS } from '../../../../../../models/constant';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
    templateUrl: './reviseCrashPlan.html'
})
export class ReviseCrashPlanComponent implements OnInit {
    addnotesPlanNo;
    detailList = [];
    devInitList = [];
    devFilterList = [];
    loading = false;
    detail: any = {};
    clrCenterNo;
    devList = [];
    submitable;

    constructor(private service: AddnotesPlanService,
                private message: NzMessageService,
                private nzModal: NzModalRef,
                private session: SessionService,
    ) {

    }

    ngOnInit(): void {

        this.qryDetail();
        this.devListInit(this.clrCenterNo);
    }

    qryDetail() {
        this.loading = true;
        this.service.detail(this.addnotesPlanNo)
            .subscribe(_data => {
                this.loading = false;
                this.detail = _data.element.addnotesPlan;
                this.clrCenterNo = _data.element.addnotesPlan.clrCenterNo;
                this.detailList = [
                    {name: '计划批次', value: this.detail.addnotesPlanNo},
                    {name: '金库', value: this.detail.clrCenterName},
                    {name: '加钞日期', value: this.detail.planAddnotesDate},
                    {name: '设备台数', value: this.detail.planDevCount},
                    {name: '加钞总量(万元)', value: this.detail.planAddnotesAmt / 10000},
                    {name: '审核人', value: this.detail.auditOpName},
                    {name: '审核时间', value: `${this.detail.auditOpDate || ''} ${this.detail.auditOpTime || ''}`},
                    {name: '审核意见', value: this.detail.refuseSuggestion},
                ];
                this.devList = _data.element.detailList;
                this.devList.forEach(element => {
                    Object.assign(element, {
                        predict: true,
                        devNo: element.devNo,
                        orgName: element.orgName,
                        address: element.address,
                        availableAmt: element.availableAmt,
                        notAddCashDays: element.notAddCashDays,
                        reviseAmt: element.planAddnotesAmt,
                    });
                });
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    devListInit(clrCenterNo) {
        const params = {
            clrCenterNo: clrCenterNo,
        };
        this.service.getDevInfos(params)
            .subscribe(_data => {
                this.devInitList = _data['retList'];
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
        console.log(this.devFilterList)
        this.devInitList.forEach(element => {
            if (element.no.indexOf(devNo) !== -1)
                this.devFilterList.push(element);
        });
        if (this.devFilterList.length > 20) {
            this.devFilterList = this.devFilterList.slice(0, 20);
        }
        console.log(this.devFilterList)
    }

    devAdd() {
        this.devList.forEach(element => {
            if (!element.devNo) {
                this.message.warning('存在未选择的设备信息列！');
                this.devList.pop();
                return;
            }
        });
        const dev = {};
        Object.assign(dev, {
            devNo: null,
            predict: false,
        });
        this.devList = [...this.devList, dev];
        this.submitable = false;
    }

    qryDevInfo(devNo) {
        this.devList.forEach(dev => {
            if (devNo === dev.devNo) {
                this.message.warning('该设备已添加,请重新选择！');
                this.devList.pop();
                this.devList = [...this.devList];
                return;
            }
        });
        // this.service.qryInfoOfDev({devNo: devNo})
        //     .subscribe(_data => {
        //         this.devList.forEach(element => {
        //             if (element.devNo === devNo) {
        //                 element.orgName = _data.data.orgName;
        //                 element.address = _data.data.address;
        //                 element.notAddCashDays = _data.data.daysCount;
        //                 element.availableAmt = _data.data.availableAmt;
        //                 element.lineName = _data.data.lineName;
        //             }
        //         });
        //
        //     });
        this.service.qryInfoOfDev({devNo: devNo}).subscribe(data => {
            console.log(data);
            this.devList.forEach(element => {
                console.log(element);
                if (element.devNo === devNo) {
                    element.orgName = data.element['entity'].orgName;
                    element.address = data.element['entity'].address;
                    element.notAddCashDays = data.element['entity'].notAddCashDays;
                    element.availableAmt = data.element['entity'].availableAmt;
                    element.lineName = data.element['entity'].lineName;
                }
            });

        });
    }

    deleteDev(i) {
        this.devList.splice(i, 1);
        this.devList = [...this.devList];
        this.submitable = false;
    }

    predict() {
        this.loading = true;
        const params = {modOpNo: this.session.userId, addnotesPlanNo: this.addnotesPlanNo};
        params['devList'] = [...this.devList.uniqBy('devNo')];
        this.service.addnotesPlanDevs(params).subscribe(_data => {
            this.cashReqAmt();
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }
    // 预测金额
    cashReqAmt() {
        const params = {addnotesPlanNo: this.addnotesPlanNo, modOpNo: this.session.userId};
        this.service.addnotesPlanCashReqAmt(params).subscribe(_data => {
            let dataSet = [];
            dataSet = _data.element.detailList;
            dataSet.forEach(data => {
                this.devList.forEach(dev => {
                    if (dev.devNo === data.devNo && !dev.predict) {
                        dev['predict'] = true;
                        dev['planAddnotesAmt'] = parseInt(data['planAddnotesAmt'], 10);
                        dev['reviseAmt'] = dev['planAddnotesAmt'];
                    }
                });
            });
            this.loading = false;
            this.submitable = true;
            this.message.success('金额预测成功！');
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    // 修改金额
    save() {
        this.loading = true;
        this.service.modAddnotesPlanAmts({
            addnotesPlanNo: this.addnotesPlanNo,
            modOpNo: this.session.userId,
            devList: this.devList.map(item => {
                return { devNo: item['devNo'], planAddnotesAmt: item['reviseAmt']};
            })
        }).subscribe(_data => {
            this.group();
        }, (error) => {
            this.loading = false;
                this.message.error(error.body.retMsg);
            }
        );
    }
    // 进行分组
    group() {
        const params: any = {};
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
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    // 提交审核
    submitAudit() {
        this.service.submitAudit({ addnotesPlanNo: this.addnotesPlanNo }).subscribe(
            data => {
                this.loading = false;
                this.message.success(data.retMsg);
                this.nzModal.triggerOk();
            }, error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }
}
