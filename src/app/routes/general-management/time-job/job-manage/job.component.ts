import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import {Page} from "../../../../models/page";
import {AppService} from "../../../../app.service";
import {TimeJobService} from "../time-job.service";
import {ModJobComponent} from "./mod/mod-job.component";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
})
export class JobComponent implements OnInit {

  formModel = {};
  page = new Page();
  loading = true;
  dataSet = [];

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: TimeJobService) { }

  ngOnInit() {
    this.refreshData(true);
  }

  search() {
    this.refreshData(true);
  }

  openMod(data) {
    this.modal.create({
      nzTitle: '修改定时任务',
      nzFooter: null,
      nzContent: ModJobComponent,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
        this.refreshData(true);
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });
  }
  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      jobNameQuery:this.formModel['jobNameQuery'] || '',
      jobName:this.formModel['jobName'] || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    this.loading = true;
    this.service.getJob(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  delJob(id) {
    this.service.delJob( id )
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  reset() {
    this.formModel['jobNameQuery'] = null;
    this.refreshData(true);
  }

  modState(data) {

    if (data.jobState === 1) {
      data.jobState = 0;
    } else {
      data.jobState = 1;
    }
    const params= _.extend({}, data);
    this.loading = true;

    this.service.modJob(params)
      .subscribe(data => {
        console.log(data)
        this.loading = false;
        this.refreshData(true);
      }, (error) => {
        this.loading = false;
        console.log(error);
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

}
