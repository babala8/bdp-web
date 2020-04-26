import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../models/page';
import { ClearCenterService } from '../clear-center.service';
import { AssignComponent } from './assign/assign.modal';
import { SYS_CONS } from '../../../models/constant';
import { DetailComponent } from '../../business/netpoint/receipt-apply/detail/detail.component';

@Component({
    templateUrl: './netpoint-distribute.html'
})
export class NetpointDistributeComponent implements OnInit {
    loading = true;
    expandForm = false;
    dataSet = [];
    lineList = [];
    lineTypes = SYS_CONS.LINE_TYPE;
    formModel: {
        dateRange?: Array<Date>,
        clrCenterNo?: string,
        status?: number,
        taskNo?: string,
        taskType?: string,
    } = {
            status: 209
        };
    searchModel = (function (formModel) {
        return {
            get startDate() {
                return formModel.dateRange ? formModel.dateRange[0].format('YYYY-MM-DD') : null;
            },
            get endDate() {
                return formModel.dateRange ? formModel.dateRange[1].format('YYYY-MM-DD') : null;
            },
            get clrCenterNo() {
                return formModel.clrCenterNo || '';
            },
            get status() {
                return typeof formModel.status === 'number' ? formModel.status : '';
            },
            get taskNo() {
                return formModel.taskNo || '';
            },
            get taskType() {
                return formModel.taskType = "4";
            }
        };
    })(this.formModel);
    states = [
        { label: '金库已确认', value: 207, badge: 'success' },
        { label: '已分配配款计划', value: 400, badge: 'success' },
        { label: '配款已领现', value: 209, badge: 'success' },
        { label: '已配款', value: 501, badge: 'processing' },
        { label: '已入库', value: 304, badge: 'processing' },
        { label: '已出库', value: 301, badge: 'processing' },
        { label: '已出库交接', value: 308, badge: 'processing' },
        { label: '网点已接库', value: 307, badge: 'success' }
    ];
    page = new Page();
    constructor(private modal: NzModalService,
        private message: NzMessageService,
        private service: ClearCenterService) {
    }

    ngOnInit() {
        this.reset();
    }

    assign(task) {
        this.modal.create({
            nzTitle: '网点领现配款',
            nzContent: AssignComponent,
            nzFooter: null,
            nzWidth: 1024,
            nzClassName: 'zj-modal',
            nzComponentParams: {
                taskNo: task.taskNo,
            },
            nzOnOk: () => this.refreshData()
        });
    }

    refreshData(reset = false) {
        this.loading = true;
        if (reset) {
            this.page.curPage = 1;
        }
        const params = _.extend({}, this.page, this.searchModel);
        this.service.page(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.page.totalPage = _data['totalPage'];
                this.loading = false;
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    reset() {
        Object.assign(this.formModel, {
            dateRange: [new Date(), new Date()],
            clrCenterNo: null,
            status: 209,
            taskNo: null,
            lineNo: null,
        });
      this.lineList = [];
      this.refreshData(true);
    }

// 查询清分中心下所有线路
  getLineList(value: string): void {
    // 当所属金库发生变化时，先清空线路信息
    this.formModel['lineNo'] = null;
    this.lineList = [];
    const params = {
      clrCenterNo: value,
      lineType: this.lineTypes.netAddnoteLine,
    };
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }

  openDetail(task) {
    this.modal.create({
      nzTitle: '申请单详情',
      nzContent: DetailComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        task: task,
      },
    });
  }
}
