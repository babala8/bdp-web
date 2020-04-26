import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Page } from 'app/models/page';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { StorageCenterService } from './../storage-center.service';
import { DetailComponent } from './detail/detail.component';

/** 业务库库存查询 */
@Component({
  templateUrl: './business-inventory.component.html',
})
export class BusinessInventoryComponent implements OnInit {

  page = new Page();
  loading = true;
  dataSet = [];
  formModel = {};

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: StorageCenterService
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
      taskNo: this.formModel['taskNo'] && this.formModel['taskNo'].trim() || '',
      shelfNo: this.formModel['shelfNo'] && this.formModel['shelfNo'].trim() || '',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    this.service.getInventory(params)
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

  reset() {
    _.extend(this.formModel, {
      shelfNo: null,
    });
    this.refreshData(true);
  }
}
