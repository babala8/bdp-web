import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppService } from '../../../app.service';
import { SYS_CONS } from '../../../models/constant';
import { Page } from '../../../models/page';
import { ClearCenterService } from '../clear-center.service';
import { ATMAllocationQueryDetailComponent } from './detail/ATM-allocation-query-detail.component';

@Component({
  selector: 'app-atm-cash-allocation',
  templateUrl: './ATM-allocation-query.html'
})
export class ATMAllocationQueryComponent implements OnInit {

  formModel = {};
  loading = true;
  dataSet = [];
  page = new Page();
  taskStatus = SYS_CONS.STATE.ADDNOTE_TASK;
  tStatus = SYS_CONS.TAG_STATUS;
  dateRange = [];
  constructor(
    private modal: NzModalService,
    private appService: AppService,
    private message: NzMessageService,
    private service: ClearCenterService
  ) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.formModel['clrCenterNo'] = null;
    this.formModel['lineNo'] = null;
    this.formModel['taskNo'] = null;
    this.formModel['dateRange'] = null;
    this.refreshData(true);
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      lineNo: this.formModel['lineNo'] || '',
      taskNo: this.formModel['taskNo'] || '',
      planStartDate: this.formModel['dateRange'] ? this.formModel['dateRange'][0].format() : '',
      endStartDate: this.formModel['dateRange'] ? this.formModel['dateRange'][1].format() : '',
      curPage: this.page.curPage, // 当前页码
      pageSize: this.page.pageSize, // 每页条数
      taskType: '1'
    };
    this.loading = true;
    this.service.getAtmCash(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openDetail(data) {
    this.modal.create({
      nzTitle: '配钞详情',
      nzWidth: '80%',
      nzFooter: null,
      nzContent: ATMAllocationQueryDetailComponent,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => {
        this.refreshData(true);
      }
    });
  }
}
