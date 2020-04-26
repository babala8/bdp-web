import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../models/page';
import { NzModalService } from 'ng-zorro-antd';
import { DetailComponent } from './detail/detail.component';
import { SYS_CONS } from '../../../../models/constant';
import { ClearCenterService } from '../clear-center.service';

@Component({
  templateUrl: './callout-manage.html',
})
export class CalloutManageComponent implements OnInit {
  formModel: any = {};
  expandForm = false;
  loading = false;
  dataSet = [];
  page = new Page();
  states = SYS_CONS.STATE.NOTES_RECEIPT_TASK;

  constructor(private clearCenterService: ClearCenterService,
              private modal: NzModalService) {
  }

  ngOnInit(): void {
    this.refreshData(true);
  }

  openDetail(data) {
    this.modal.create({
      nzTitle: '调出详情',
      nzContent: DetailComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzComponentParams: {
        task: data,
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
    });
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
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
      taskType: 8,
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

  // 重置表单
  reset() {
    this.formModel = {};
    this.refreshData(true);
  }
}

