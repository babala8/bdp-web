import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { AppService } from '../../../app.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../models/constant';
import { ClearCenterService } from '../clear-center.service';
import { ATMInventoryDetailComponent } from './detail/ATM-inventory-detail.component';

@Component({
  selector: 'app-ATM-inventory',
  templateUrl: './ATM-inventory.html'
})
export class ATMInventoryComponent implements OnInit {

  formModel = {};
  loading = true;
  dataSet = [];
  page = new Page();
  taskStatus = SYS_CONS.STATE.ADDNOTE_TASK;
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
    this.formModel['taskNo'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['lineNo'] = null;
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
      planStartDate: this.formModel['dateRange']? this.formModel['dateRange'][0].format():'',
      endStartDate: this.formModel['dateRange']? this.formModel['dateRange'][1].format():'',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
      taskType: '1'
    };
    this.loading = true;
    this.service.getAtmInventory(params)
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
      nzTitle: '清点详情',
      nzWidth: '80%' ,
      nzFooter: null,
      nzContent: ATMInventoryDetailComponent,
      nzComponentParams: {
        data :data
      }
    });
  }

}
