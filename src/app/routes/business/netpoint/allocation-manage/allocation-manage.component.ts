import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/session.service';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../models/constant';
import { Page } from '../../../../models/page';
import { NetPointService } from '../netpoint.service';
import { DetailComponent } from '../allocation-apply/detail/detail.component';
import { ProgressComponent } from './progress/progress.component';
import { SplitAllocationComponent } from './split/splitAllocation.component';

@Component({
  templateUrl: './allocation-manage.html'
})
export class AllocationManageComponent implements OnInit {
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
  searchModel = (function (formModel) {
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
        return formModel.taskType = "2";
      }
    };
  })(this.formModel);
  states = SYS_CONS.STATE.NET_DEPOSIT_TASK;
  lineTypes = SYS_CONS.LINE_TYPE;
  page = new Page();
  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private session: SessionService,
    private netPointService: NetPointService) {
  }

  ngOnInit() {
    this.reset();
  }

  // 打开详情界面
  openDetail(task) {
    this.modal.create({
      nzTitle: '任务单详情',
      nzContent: DetailComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        task: task
      }
    });
  }

  // 打开任务单拆分界面
  openSplit(taskNo) {
    this.modal.create({
      nzTitle: '任务单拆分',
      nzContent: SplitAllocationComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: taskNo
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
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
      lineNo: null,
      status: null,
      taskNo: null
    });
    this.lineList = [];
    this.refreshData(true);
  }

  openProgress(data) {
    this.modal.create({
      nzTitle: '任务单进度',
      nzContent: ProgressComponent,
      nzComponentParams: {
        data: data
      },
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzFooter: null
    })
  }

  // 合并任务单
  mergeTask() {
    const taskNoList = this.dataSet.filter(item => {return item.checked}).map(item => {return item.taskNo});
    if (taskNoList.length === 0) {
      this.message.warning('尚未选择任何任务单');
      return;
    }
    this.loading = true;
    console.log(taskNoList);
    const params = {taskNoList: taskNoList};
    this.netPointService.mergeAllocation(taskNoList)
      .subscribe(result => {
        this.loading = false;
        this.message.success('合并成功');
        this.refreshData(true);
      }, err => {
        this.loading = false;
      })
  }

  // 查询清分中心下所有线路
  getLineList(value: string): void {
    // 当所属金库发生变化时，先清空线路信息
    this.formModel['lineNo'] = null;
    this.lineList = [];
    const params = {
      clrCenterNo: value,
      lineType: this.lineTypes.netAddnoteLine, // 网点加钞线路
    };
    this.netPointService.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }
}
