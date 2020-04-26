import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../../models/page';
import { SYS_CONS } from '../../../../models/constant';
import { ApplyDetailComponent } from './detail/apply-detail.component';
import { ProgressComponent } from './process/progress.component';
import { CommonService } from '../common.service';

@Component({
  templateUrl: './common-task.html',
})
export class CommonTaskComponent implements OnInit {
  formModel: any = {};
  loading = false;
  commonApplyList = [];
  page = new Page();
  states = SYS_CONS.STATE.SELF_PRODUCT_TASK;
  taskTypeList = [];

  constructor(private modal: NzModalService,
              private commonService: CommonService) {

  }

  ngOnInit(): void {
    this.qryTaskTypeList();
    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      productType: 1,
    };
    Object.assign(params, this.page, this.formModel, {
      startDate: this.formModel.dateRange ? this.formModel.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: this.formModel.dateRange ? this.formModel.dateRange[1].format('YYYY-MM-DD') : '',
    });
    this.commonService.qryCommonApplyList(params)
      .subscribe(result => {
        this.commonApplyList = result['retList'];
        this.page.totalRow = result['totalRow'];
      });
  }

  reset() {
    this.formModel = {};
  }

  // 查询任务单类型列表
  qryTaskTypeList() {
    this.commonService.qryServiceForUse({})
      .subscribe(result => {
        this.taskTypeList = result['retList'];
      })
  }

  // 打开详情界面
  openDetail(taskNo) {
    this.modal.create({
      nzTitle: '任务单详情',
      nzContent: ApplyDetailComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        taskNo: taskNo
      }
    });
  }

  // 打开查询进度页面
  openProgress(taskDetail) {
    console.log(taskDetail);
    this.modal.create({
      nzTitle: '创新业务申请单进度详情',
      nzContent: ProgressComponent,
      nzFooter: null,
      nzWidth: 1024,
      nzClassName: 'zj-modal',
      nzComponentParams: {
        data: taskDetail
      }
    });
  }
}

