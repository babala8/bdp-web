import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../models/page';
import { NzModalService } from 'ng-zorro-antd';
import { DetailComponent } from './notes-allocation-detail/detail.component';
import { SYS_CONS } from '../../../../models/constant';
import { ClearCenterService } from '../clear-center.service';


@Component({
  templateUrl: './callin-manage.html'
})
export class CallinManageComponent implements OnInit {
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
    console.log('金库号为:'+this.formModel.clrCenterNo)

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

  // 查询详情
  openDetail(data) {

    this.modal.create({
      nzTitle: '调入详情',
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
