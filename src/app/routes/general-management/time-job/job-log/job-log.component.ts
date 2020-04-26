import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { getDateOfInterval } from '@core/utils';
import * as _ from 'lodash';
import { Page } from "../../../../models/page";
import { AppService } from "../../../../app.service";
import { TimeJobService } from "../time-job.service";

@Component({
  selector: 'app-jobLog',
  templateUrl: './job-log.component.html',
})
export class JobLogComponent implements OnInit {

  page = new Page();
  jobResult = [{'no':'0','name':'执行成功'},
    {'no':'1','name':'执行失败'},
    {'no':'2','name':'执行异常'}];
  loading = true;
  dataSet = [];
  formModel: {
    startTime?: Date,
    endTime?: Date,
    jobName?: string,
    jobResult?: string
    //jobType?: number
  } = {};
  searchModel = (function (formModel) {
    return {
      get startTime() {
        return formModel.startTime ? formModel.startTime.format('YYYY-MM-DD 00:00:00') : '';
      },
      get endTime() {
        return formModel.endTime ? formModel.endTime.format('YYYY-MM-DD 23:59:59') : '';
      },
      get jobName() {
        return formModel.jobName || '';
      },
      get jobResult() {
        return formModel.jobResult || '';
      }
    };
  })(this.formModel);
  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: TimeJobService
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
    this.service.getJobLog(params)
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
      startTime: getDateOfInterval(-4),
      endTime: getDateOfInterval(3),
      jobName: null,
      jobResult: null
      //jobType: null
    });
    this.refreshData(true);
  }


}
