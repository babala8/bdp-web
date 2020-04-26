import { Component, OnInit } from '@angular/core';
import { Page } from "../../../models/page";
import { InventoryInspectService } from "./inventory-inspect.service";

@Component({
  selector: 'app-inventory-inspect',
  templateUrl: './inventory-inspect.component.html'
})
/**
 * 仓储中心-查库
 */
export class InventoryInspectComponent implements OnInit {

  formModel = {};
  dateFormat = 'yyyy-MM-dd';
  loading = false;
  page = new Page();
  inventoryInspectHistoryList;

  constructor(
    private service: InventoryInspectService
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
    this.loading  = true;
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      curPage: this.page.curPage,
      pageSize: this.page.pageSize
    };
    Object.assign(params, this.formModel, {
      userName: this.formModel['opUser'] ? this.formModel['opUser'] : '',
      startDate: this.formModel['dateRange'] ? this.formModel['dateRange'][0].format('YYYY-MM-DD') : '',
      endDate: this.formModel['dateRange'] ? this.formModel['dateRange'][1].format('YYYY-MM-DD') : '',
    });
    this.service.getInventoryInspectHistory(params).subscribe(_data => {
      console.log(params);
      this.loading = false;
      this.inventoryInspectHistoryList = _data['retList'];
      this.page.totalRow = _data['totalRow'];
      this.page.totalPage = _data['totalPage'];
    },(error) => {
      this.loading = false;
    });

  }

}
