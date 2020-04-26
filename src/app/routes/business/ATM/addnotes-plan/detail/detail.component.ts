import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';

import { AddnotesPlanService } from '../addnotes-plan.service';
import { AppService } from 'app/app.service';
import { SYS_CONS } from '../../../../../models/constant';
import { AddnotesTaskDetailComponent } from '../../addnotes-task/addnotes-task-detail/addnotes-task-detail.component';

@Component({
    templateUrl: 'detail.html',
    styleUrls: ['./detail.less']
})

export class DetailComponent implements OnInit {

    loading = true;
    addnotesPlanNo: string;
    detailList = [];
    dataset = [];
    detail: any = {};

    constructor(
        private message: NzMessageService,
        private service: AddnotesPlanService,
        private modal: NzModalService,
        private appService: AppService
    ) { }

    ngOnInit() {
        this.getDetail();
    }

    dataSort() {
        let group: any = _.groupBy(this.dataset, 'lineNo');
        this.dataset = [];
        for (let i in group) {
            group[i].sort(this.sortRule);
            this.dataset = this.dataset.concat(group[i]);
        }
    }

    sortRule(m, n) {
        if (m.sortNo < n.sortNo)
            return -1;
        else
            return 1;
    }

    getDetail() {
        this.service.detail(this.addnotesPlanNo)
            .subscribe(_data => {
                this.loading = false;
                this.dataset = _data.element.detailList;
                this.detail = _data.element.addnotesPlan;
                const state = _.filter(SYS_CONS.STATE.ADDNOTE_PLAN, { value: parseInt(this.detail.status) });
                this.detailList = [
                    { name: '计划批次', value: this.detail.addnotesPlanNo },
                    { name: '金库', value: this.detail.clrCenterName },
                    { name: '加钞日期', value: this.detail.planAddnotesDate },
                    { name: '状态', value: state.length > 0 ? state[0].label : '未知' },
                    { name: '设备台数', value: this.detail.planDevCount },
                    { name: '加钞总量(万元)', value: this.detail.planAddnotesAmt / 10000.0 },
                    { name: '审核人', value: this.detail.auditOpName || ''},
                    { name: '审核时间', value: `${this.detail.auditDate  || ''} ${this.detail.auditTime || ''}` },
                    { name: '审核意见', value: this.detail.refuseSuggestion },
                ];
                if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
                    const lineList = [];
                    this.detail.lineList.forEach(element => {
                        lineList.push(element.lineName);
                    });
                    this.detail.lineName = lineList.join('、');
                    this.detail.lineNameTitle = lineList.join('\r\n');
                }
                this.dataSort();
            }, error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    // 加钞任务单详情
    openDispatchDetail(data) {
        data.clrCenterName = this.detail.clrCenterName;
        data.planFinishDate = this.detail.planAddnotesDate;
        data.lineName = this.detail.lineName;
        const window = this.modal.create({
            nzTitle: '加钞任务单详情',
            nzWidth: '95%',
            nzFooter: null,
            nzContent: AddnotesTaskDetailComponent,
            nzZIndex: 2000,
            nzComponentParams: {
                data: data
            },
            nzOnOk: () => {
                // 【成功时】，刷新数据，并回到第一页
            },
            nzOnCancel: () => {
                // 一般情况，【取消时】，什么都不做
            },
        });
    }


}
