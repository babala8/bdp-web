import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { AppService } from 'app/app.service';
import { SessionService } from '@core/session.service';
import { ModPostScheduleWeekComponent } from './component/week/mod/mod-postSchedule-week.component';
import { AddPostScheduleSubmitComponent } from './component/add-postSchedule-submit.component';
import { ModPostScheduleMonthComponent } from './component/month/mod/mod-postSchedule-month.component';
import { Page } from "../../../../models/page";
import { SYS_CONS } from "../../../../models/constant";
import { PostScheduleService } from "../post-schedule.service";

@Component({
  templateUrl: './schedule-mould.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class ScheduleMouldComponent implements OnInit {

  loading = false;
  dataSet = [];
  formModel = {};
  interval;

  page = new Page();
  mouldTypes = SYS_CONS.MOULD_TYPES;
  postInfos;

  curOrg = {
    no: this.session.orgNo,
    name: this.session.orgName,
    orgType: this.session.userInfo.sysOrg.no
  };

  constructor(private service: PostScheduleService,
              private modal: NzModalService,
              private message: NzMessageService,
              private session: SessionService,
              private appService: AppService,
              ) {
  }

  ngOnInit() {
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.service.getAllPost()
      .subscribe(_data => {
        console.log(_data);
        this.postInfos = _data['retList'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
    this.refreshData(true);
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
    params['mouldType'] = this.formModel['mouldType'] || '';

    this.service.getPostScheduleInfo(params)
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
    this.formModel['mouldType'] = null;
    this.formModel['org'] = {no: this.curOrg.no, name: this.curOrg.name};
    this.refreshData(true);
  }

  openAdd() {
    this.modal.create({
      nzTitle: '新增排班模板',
      nzWidth: '60%' ,
      nzFooter: null,
      nzContent: AddPostScheduleSubmitComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openMod(data) {

    if(data.mouldType == 1) {
      this.modal.create({
        nzTitle: '修改排班模板',
        nzWidth: '80%' ,
        nzFooter: null,
        nzContent: ModPostScheduleWeekComponent,
        nzComponentParams: {
          data: data,
        },
        nzOnOk: () => {
          this.refreshData(true);
        },
        nzOnCancel: () => {
        },
      });
    }else if(data.mouldType == 2) {
      this.modal.create({
        nzTitle: '修改排班模板',
        nzWidth: '80%' ,
        nzFooter: null,
        nzContent: ModPostScheduleMonthComponent,
        nzComponentParams: {
          data: data,
        },
        nzOnOk: () => {
          this.refreshData(true);
        },
        nzOnCancel: () => {
        },
      });
    }

  }

  confirmDel(mouldId) {
    this.service.delPostSchedule(mouldId).subscribe(data => {
      this.message.success('删除模板信息成功');
      this.refreshData(true);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

}
