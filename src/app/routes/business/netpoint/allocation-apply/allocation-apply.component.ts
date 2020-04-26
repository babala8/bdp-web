import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/session.service';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS, OPERATETYPE } from '../../../../models/constant';
import { Page } from '../../../../models/page';
import { NetPointService } from '../netpoint.service';
import { ApplyModalComponent } from './apply/apply.modal.component';
import { AuditComponent } from './audit/audit.modal';
import { DetailComponent } from './detail/detail.component';
import { ModifyComponent } from './modify/modify.modal';

@Component({
  templateUrl: './allocation-apply.html',
})
export class AllocationApplyComponent implements OnInit {
  loading = true;
  expandForm = false;
  dataSet = [];
  lineList = [];
  formModel: {
    dateRange?: Array<Date>,
    clrCenterNo?: string,
    status?: string,
    taskNo?: string,
    lineNo?: string,
    taskType?: string
  } = {};
  operateTypeList = OPERATETYPE;
  lineType = SYS_CONS.LINE_TYPE;
  searchModel = (function(formModel) {
    return {
      get startDate() {
        return formModel.dateRange[0] ? formModel.dateRange[0].format('YYYY-MM-DD') : '';
      },
      get endDate() {
        return formModel.dateRange[1] ? formModel.dateRange[1].format('YYYY-MM-DD') : '';
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
      get lineNo() {
        return formModel.lineNo || '';
      },
      get taskType() {
        return formModel.taskType = '2';
      },
    };
  })(this.formModel);
  states = SYS_CONS.STATE.NET_DEPOSIT_TASK;
  page = new Page();

  constructor(private modal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private netPointService: NetPointService) {
  }

  ngOnInit() {
    this.reset();
  }

  openAdd() {
    this.modal.create({
      nzTitle: '寄库&解现申请',
      nzContent: ApplyModalComponent,
      nzWidth: 1024,
      nzZIndex: 99,
      nzFooter: null,
      nzOnOk: () => this.refreshData(),
    });
  }

  delete(no) {
    this.netPointService.delete(no)
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData();
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  audit(task, operate) {
    this.modal.create({
      nzTitle: '网点寄库&解现审批',
      nzContent: AuditComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: task.taskNo,
        operate: operate,
      },
      nzOnOk: () => this.refreshData(),
    });
  }

  mod(task) {
    console.log(task);
    this.modal.create({
      nzTitle: '重新提交',
      nzContent: ModifyComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        task: task,
        operateType: 'Mod'
      },
      nzOnOk: () => this.refreshData(),
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

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }
    const params = _.extend({}, this.page, this.searchModel);
    this.netPointService.page(params)
      .subscribe(_data => {
        console.log(params);
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
      status: null,
      taskNo: null,
      lineNo: null,
    });
    this.lineList = [];
    this.refreshData(true);
  }

  // 获取清分中心下所有线路
  getLineList(value: string): void {
    // 当所属金库发生变化时，先清空线路信息
    this.formModel['lineNo'] = null;
    this.lineList = [];
    const params = {
      clrCenterNo: value,
      lineType: this.lineType.netAddnoteLine, // 网点加钞线路
    };
    this.netPointService.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }

}
