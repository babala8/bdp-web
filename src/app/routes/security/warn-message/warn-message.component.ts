import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppService } from '../../../app.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { WarnMessageService } from "./warn-message.service";

@Component({
  templateUrl: './warn-message.component.html',
})
export class WarnMessageComponent implements OnInit {

  page = new Page();
  loading = true;
  dataSet = [];
  formModel: {
    name?: string,
    time?: Date,
  } = {};
  searchModel = (function (formModel) {
    return {
      get name() {
        return formModel.name || '';
      },
      get time() {
        return formModel.time ? formModel.time.format('YYYY-MM-DD') : '';
      },
    };
  })(this.formModel);

  constructor(
    private modal: NzModalService,
    private appService: AppService,
    private message: NzMessageService,
    private service: WarnMessageService
  ) { }

  ngOnInit() {
    this.reset();
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }

    const params = _.extend({}, this.page, this.searchModel);
    this.service.getPushLog(params)
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
      time: new Date(),
    });
    this.refreshData(true);
  }
}
