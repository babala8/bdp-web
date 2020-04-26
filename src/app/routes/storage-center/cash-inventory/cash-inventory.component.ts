import { Component, OnInit } from '@angular/core';
import { Page } from 'app/models/page';
import { NzModalService } from 'ng-zorro-antd';
import { DetailComponent } from './detail/detail.component';

/** 现金库库存查询 */
@Component({
  templateUrl: './cash-inventory.component.html'
})
export class CashInventoryComponent implements OnInit {
  loading = false;
  page = new Page();
  formModel = {};
  dataSet = [{
    taskNo: 'WDDB2019082700001',
    amount: 200000,
    inTime: '08-27 16:50',
    turnInTime: '08-26 08:35',
    status: 1
  }];
  constructor(private modal: NzModalService) { }

  ngOnInit(): void {
    this.refreshData(true);
  }

  // 刷新查询信息
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      taskNo: this.formModel['taskNo'] || '',
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    this.dataSet = [{
      taskNo: 'WDDB2019082700001',
      amount: 200000,
      inTime: '08-27 16:50',
      turnInTime: '08-26 08:35',
      status: 1
    }];
    this.loading = false;
  }

  // 打开详情界面
  openDetail(data) {
    this.modal.create({
      nzTitle: '现金库存详情',
      nzFooter: null,
      nzWidth: '60%',
      nzContent: DetailComponent,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => {
        this.refreshData();
      },
      nzOnCancel: () => {
      },
    });
  }

  // 重置搜索条件
  reset() {
    this.formModel = {};
  }

}
