import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { AppService } from 'app/app.service';
import { SessionService } from '@core/session.service';
import { AddSchedulePlanSubmitComponent } from './component/add-schedulePlan-submit.component';
import { ModSchedulePlanMonthComponent } from './component/month/mod-schedulePlan-month.component';
import {Page} from "../../../../models/page";
import {PostScheduleService} from "../post-schedule.service";

@Component({
  templateUrl: './schedule-plan.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],

})
export class SchedulePlanComponent implements OnInit {

  loading = false;
  dataSet = [];
  formModel = {};
  interval;

  page = new Page();
  postInfos;
  scheduleMoulds;

  constructor(private service: PostScheduleService,
              private modal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private appService: AppService,
              ) {
  }

  curOrg = {
    no: this.session.orgNo,
    name: this.session.orgName,
    orgType: this.session.userInfo.sysOrg.no
  };

  ngOnInit() {
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.service.getAllPost()
      .subscribe(_data => {
        console.log(_data);
        this.postInfos = _data['retList'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
    this.getMouldInfo();
    this.refreshData(true);
  }

  getMouldInfo() {
    let params = {};
    params = _.extend(params, this.formModel);
    params['orgNo'] = this.formModel['org'].no || '';
    params['postNo'] = this.formModel['postInfo'];
    console.log(params);
    this.service.getMouldInfo(params)
      .subscribe(_data => {
        console.log(_data);
        this.scheduleMoulds = _data['retList'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  ngOnDestroy() {
  }

  refreshData(rest = false) {
    if (rest) {
      this.page.curPage = 1;
    }
    this.loading = true;
    let params = {
      pageSize: this.page.pageSize,
      curPage: this.page.curPage,
      totalRow: this.page.totalRow,
      totalPage: this.page.totalPage,
    };
    params = _.extend(params,this.page, this.formModel);
    params['orgNo'] = this.formModel['org'].no || '';
    params['postNo'] = this.formModel['postInfo'] || '';
    params['mouldNo'] = this.formModel['scheduleMould'] || '';
    params['scheduleMonth'] = this.formModel['scheduleMonth'] != null ? this.formModel['scheduleMonth'].format('YYYY-MM') : '';
    console.log(params);

    this.service.getPostSchedulePlan(params)
      .subscribe(_data => {
        console.log(_data);
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
    this.formModel['postInfo'] = null;
    this.formModel['scheduleMould'] = null;
    this.formModel['scheduleMonth'] = null;
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.refreshData(true);
  }

  openAdd() {
    this.modal.create({
      nzTitle: '新增月度排班计划',
      nzWidth: '60%' ,
      nzFooter: null,
      nzContent: AddSchedulePlanSubmitComponent,
      nzOnOk: () => {
        this.search();
      },
      nzOnCancel: () => {
      },
    });
  }

  openMod(data) {
    this.modal.create({
      nzTitle: '修改' + data.scheduleMonth + '月排班计划',
      nzWidth: '90%' ,
      nzFooter: null,
      nzContent: ModSchedulePlanMonthComponent,
      nzComponentParams: {
        data: data,
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(planNo) {
    this.service.delPostSchedulePlan(planNo).subscribe(data => {
      this.message.success('删除排班计划成功');
      this.refreshData(false);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

}
