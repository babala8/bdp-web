import { Component, OnInit } from '@angular/core';
import { Page } from "../../../models/page";
import { InventoryCountService } from "./inventory-count.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: 'app-inventory-count',
  templateUrl: './inventory-count.component.html'
})
/**
 * 仓储中心-盘库
 */
export class InventoryCountComponent implements OnInit {

  formModel = {};
  page = new Page();
  dateFormat = 'yyyy-MM-dd';
  loading = false;
  inventoryCountHistoryList;

  constructor(
    private service: InventoryCountService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.reset();
  }

  /**
   * 重置
   */
  reset() {
    this.formModel = {};
    this.refreshData(true);
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    Object.assign(params, this.formModel, {
      userName: this.formModel['opUser'] ? this.formModel['opUser'] : '',
      startDate: this.formModel['dateRange'] ? this.formModel['dateRange'][0].format('YYYY-MM-DD') : '',
      endDate: this.formModel['dateRange'] ? this.formModel['dateRange'][1].format('YYYY-MM-DD') : '',
    });

    this.service.getInventoryCountHistory(params).subscribe(_data => {
      this.loading = false;
      this.inventoryCountHistoryList = _data['retList'];
      this.page.totalPage = _data['totalPage'];
      this.page.totalRow = _data['totalRow'];
      this.message.success(_data['retMsg']);
    },(error) => {
      this.loading = false;
      this.message.error(error.body.retMsg);
    });
  }

}
