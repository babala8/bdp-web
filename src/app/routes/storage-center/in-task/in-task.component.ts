import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { OPERATETYPE, SYS_CONS } from 'app/models/constant';
import { Page } from "app/models/page";
import { CommonService } from 'app/routes/common.service';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { OutDetailComponent as DetailComponent } from './../out-task/out-detail/out-detail.component';
import { StorageCenterService } from './../storage-center.service';

/** 入库任务管理 */
@Component({
  templateUrl: './in-task.component.html',
})
export class InTaskComponent implements OnInit {

  loading = false;
  dataSet = [];
  taskType = [];
  page = new Page();
  formModel = {};
  states = SYS_CONS.STATE.NOTES_ALLOCATION_TASK;
  taskAllType = [
    { nzValue: 1, nzLabel: "自助机具加钞任务单" },
    { nzValue: 2, nzLabel: "网点解现&寄库任务单" },
    { nzValue: 3, nzLabel: "网点寄库领回任务单" },
    { nzValue: 4, nzLabel: "网点领现任务单" },
    { nzValue: 5, nzLabel: "现金调拨任务单" },
    { nzValue: 8, nzLabel: "钞处领现任务单" },
    { nzValue: 9, nzLabel: "钞处解现任务单" },
  ];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: StorageCenterService,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this.reset();
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      taskType: this.formModel['taskType'] || '',
      taskNo: this.formModel['taskNo'] && this.formModel['taskNo'].trim() || '',
      lineNo: this.formModel['lineNo'] && this.formModel['lineNo'].trim() || '',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    this._common.qryTaskList(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });

  }

  reset() {
    this.formModel['clrCenterNo'] = null;
    this.formModel['taskType'] = null;
    this.formModel['taskNo'] = null;
    this.formModel['lineNo'] = null;
    this.refreshData(true);
  }

  // 出入库详情页面相同，复用出库详情页面的方法
  openDetail(data) {
    this.modal.create({
      nzTitle: '库存详情',
      nzFooter: null,
      nzWidth: '60%',
      nzContent: DetailComponent,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
    });
  }

  // 入库确认
  inWarehouseConfirm(data) {
    const param = {
      taskNo: data.taskNo,
      operateType: data.taskType==1? OPERATETYPE.ChaoChuRuKu : OPERATETYPE.QueRenRuKu,
      taskType: data.taskType,
    };
    this._common.modTask(param)
      .subscribe(_date => {
        this.message.success(
          `入库成功！`,
        );
      });
    this.refreshData();
  }
}
