import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/session.service';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../models/constant';
import { Page } from '../../../../models/page';
import { NetPointService } from '../netpoint.service';
import { ReceiptApplyModal } from './apply/apply.modal';
import { AuditComponent } from './audit/audit.modal';
import { DetailComponent } from './detail/detail.component';
import { SplitTaskComponent } from "./split/split-task.component";
import { MergeTaskComponent } from "./merge/merge-task.component";

@Component({
  templateUrl: './receipt-apply.component.html',
})
export class ReceiptApplyComponent implements OnInit {
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
    taskType?: string,
  } = {};
  searchModel = (function(formModel) {
    return {
      get startDate() {
        return formModel.dateRange ? formModel.dateRange[0].format('YYYY-MM-DD') : '';
      },
      get endDate() {
        return formModel.dateRange ? formModel.dateRange[1].format('YYYY-MM-DD') : '';
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
        return formModel.taskType = '4';
      },
    };
  })(this.formModel);
  states = SYS_CONS.STATE.NET_CASH_TASK;
  lineType = SYS_CONS.LINE_TYPE;
  page = new Page();

  constructor(private modal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private netPointService: NetPointService) {
  }

  ngOnInit() {
    this.reset();
  }

  // 打开领现申请模态框
  openAdd() {
    this.modal.create({
      nzTitle: '领现申请',
      nzContent: ReceiptApplyModal,
      nzWidth: 1024,
      nzZIndex: 99,
      nzClassName: 'zj-modal',
      nzFooter: null,
      nzOnOk: (result) => {
        // result返回结果解构：{"mergeOrSplitFlag":1,"taskNo":"028001042003200002","retCode":"00","retMsg":"任务单申请成功！"}
        // mergeOrSplitFlag为1 表示该任务单可拆分
        if (result.result['mergeOrSplitFlag'] === 1) {
          this.openSplit(result.result);
        }
      }
    });
  }

  // 打开任务单拆分界面
  openSplit(taskInfo) {
    this.modal.create({
      nzTitle: '网点领现任务单拆分',
      nzContent: SplitTaskComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskInfo: taskInfo
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
    });
  }

  // 打开任务单合并界面
  openMerge(taskInfo) {
    this.modal.create({
      nzTitle: '网点领现任务单合并',
      nzContent: MergeTaskComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        // taskInfo: taskInfo
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
    });
  }

  delete(no) {
    this.netPointService.delete(no)
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData();
      }, (error) => {
        this.loading = false;
        this.message.error(error.body.retMsg);
      });
  }

  audit(task, nextStatus, operateType) {
    console.log(operateType)
    this.modal.create({
      nzTitle: '网点领现审批',
      nzContent: AuditComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: task.taskNo,
        nextStatus: nextStatus,
        operateType: operateType,
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
  getLineList(value: String) {
    this.formModel['lineNo'] = null;
    this.lineList = [];
    const params = {
      clrCenterNo : value,
      lineType : this.lineType.netAddnoteLine, //网点加钞线路
    };
    this.netPointService.qryAllLine(params).subscribe(_data => {
      this.lineList = _data.retList;
    });
  }

}
