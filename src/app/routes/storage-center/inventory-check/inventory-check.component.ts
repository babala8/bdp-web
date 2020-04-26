import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../models/constant';
import { Page } from '../../../models/page';
import { StorageCenterService } from './../storage-center.service';
import { DetailComponent } from './detail/detail.component';

/** 库存核实 */
@Component({
  templateUrl: './inventory-check.component.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class InventoryCheckComponent implements OnInit {

  loading = false;
  dataSet = [];
  page = new Page();
  formModel = {};
  interval;

  flags = SYS_CONS.FLAGS;

  constructor(
    private service: StorageCenterService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.refreshData(true);
  }

  refreshData(rest = false) {
    if (rest) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      pageSize: this.page.pageSize,
      curPage: this.page.curPage,
      totalRow: this.page.totalRow,
      totalPage: this.page.totalPage,
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      flag: this.formModel['flag'] || '',
    };
    params['startTime'] = this.formModel['startTime'] ? this.formModel['startTime'].format('YYYY-MM-DD') + " 00:00:00" : '';
    params['endTime'] = this.formModel['endDate'] ? this.formModel['endDate'].format('YYYY-MM-DD') + " 23:59:59" : ''

    this.service.getCheckInventoryInfo(params)
      .subscribe(_data => {
        this.loading = false;
        this.page.totalRow = _data['totalRow'];
        this.dataSet = _data['retList'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  search() {
    this.refreshData(true);
  }

  reset() {
    this.formModel['clrCenterNo'] = null;
    this.formModel['startTime'] = null;
    this.formModel['endTime'] = null;
    this.formModel['flag'] = null;
    this.refreshData(true);
  }

  openVerify() {
    this.modal.create({
      nzTitle: '库存核定',
      nzWidth: '98%',
      nzFooter: null,
      nzContent: DetailComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

}
