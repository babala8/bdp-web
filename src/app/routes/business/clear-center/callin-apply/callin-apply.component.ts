import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../models/page';
import { NzModalService } from 'ng-zorro-antd';
import { ApplyComponent } from './apply/apply.component';
import { DetailComponent } from './detail/detail.component';
import { SYS_CONS } from '../../../../models/constant';
import { ClearCenterService } from '../clear-center.service';

@Component({
  templateUrl: './callin-apply.html'
})
export class CallinApplyComponent implements OnInit {
  formModel: any = {};
  expandForm = false;
  loading = false;
  dataSet = [];
  page = new Page();
  states = SYS_CONS.STATE.NOTES_ALLOCATION_TASK;

  constructor(private clearCenterService: ClearCenterService,
              private modal: NzModalService) {}

  ngOnInit(): void {
    this.refreshData(true);
  }

  // 刷新数据
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      clrCenterNo: this.formModel.clrCenterNo ? this.formModel.clrCenterNo : '',
      taskNo: this.formModel.taskNo ? this.formModel.taskNo : '',
      status: this.formModel.status ? this.formModel.status : '',
      taskType: 9,
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
    };
    Object.assign(params, this.page);

    this.loading = true;
    this.clearCenterService.qryTaskListByPage(params)
      .subscribe(result => {
        this.loading = false;
        this.page.totalRow = result['totalRow'];
        this.dataSet = result['retList'];
      }, err => {
        this.loading = false;
      });
  }

  // 重置表单、刷新页面
  reset() {
    this.formModel = {};
    this.refreshData(true);
  }

  // 打开添加申请单模态框
  openAdd() {
    this.modal.create({
      nzTitle: '调入申请',
      nzContent: ApplyComponent,
      nzWidth: 1024,
      nzZIndex: 99,
      nzClassName: 'zj-modal',
      nzFooter: null,
      nzOnOk: () => this.refreshData()
    });
  }

  // 调整申请单
  openMod(data) {}

  // 查询详情
  openDetail(data) {
    this.modal.create({
      nzTitle: `调入申请(申请单号：${data.taskNo})`,
      nzContent: DetailComponent,
      nzComponentParams: {
        task: data
      },
      nzWidth: 1024,
      nzZIndex: 99,
      nzFooter: null,
      nzOnOk: () => {}
    });
  }
}
