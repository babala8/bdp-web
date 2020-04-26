import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppService } from '../../../app.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { UserLogService } from "./user-log.service";

@Component({
  templateUrl: './user-log.component.html',
})
export class UserLogComponent implements OnInit {

  page = new Page();
  method = [{ 'no': 'GET', 'name': '查询' },
  { 'no': 'POST', 'name': '新增' },
  { 'no': 'PUT', 'name': '更新' },
  { 'no': 'DELETE', 'name': '删除' }];
  result = [{ 'no': '00', 'name': '成功' },
  { 'no': 'EE', 'name': '异常' },
  { 'no': 'FF', 'name': '失败' }];
  loading = true;
  dataSet = [];
  dateRange = [new Date(), new Date()];
  formModel: {
    name?: string,
    method?: string,
    result?: string,
    requestStartDate?: Date,
    requestEndDate?: Date
  } = {};
  searchModel = (function (formModel) {
    return {
      get name() {
        return formModel.name || '';
      },
      get method() {
        return formModel.method || '';
      },
      get result() {
        return formModel.result || '';
      },
      get requestStartDate() {
        return formModel.requestStartDate ? formModel.requestStartDate.format('YYYY-MM-DD') : '';
      },
      get requestEndDate() {
        return formModel.requestEndDate ? formModel.requestEndDate.format('YYYY-MM-DD') : '';
      }
    };
  })(this.formModel);

  constructor(
    private modal: NzModalService,
    private appService: AppService,
    private message: NzMessageService,
    private userLogService: UserLogService
  ) { }

  ngOnInit() {
    this.reset();
  }

  onDateChange(result: Date): void {
    this.formModel['requestStartDate'] = result[0];
    this.formModel['requestEndDate'] = result[1];
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }

    const params = _.extend({}, this.page, this.searchModel);
    this.userLogService.getUserLog(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.loading = false;
        console.log(this.dataSet);
      }, (error) => {
        this.loading = false;
        console.log(error);
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  reset() {
    _.extend(this.formModel, {
      name: null,
      method: null,
      result: null,
      requestEndDate: new Date(),
      requestStartDate: new Date(),
    });
    this.dateRange = [new Date(), new Date()];
    this.refreshData(true);
  }
}
