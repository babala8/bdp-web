import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../models/page';
import * as _ from 'lodash';
import { SecurityWarningService } from './security-warning.service';
import { SYS_CONS } from '../../../models/constant';
import { DetailComponent } from './detail/detail.component';
import { HandleSecurityWarnComponent } from './handle/handle-securityWarn.component';

@Component({
  templateUrl: './security-warning.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class SecurityWarningComponent implements OnInit {

  loading = false;
  dataSet = [];
  page = new Page();
  formModel = {};
  interval;
  warnTypes  = SYS_CONS.SECURITY_WARN_TYPE;
  clrCenterTypes = [];

  constructor(private service: SecurityWarningService,
              private modal: NzModalService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.formModel['startDate'] = null;
    this.formModel['endDate'] = null;
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
    params['startDate'] = this.formModel['startDate'] ? this.formModel['startDate'].format('YYYY-MM-DD') : '';
    params['endDate'] = this.formModel['endDate'] ? this.formModel['endDate'].format('YYYY-MM-DD') : ''
    console.log(this.formModel);

    this.service.getSecurityWarnInfo(params)
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
    this.formModel['startDate'] = null;
    this.formModel['endDate'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['warnType'] = null;
    this.refreshData(true);
  }

  openDetail(data) {
    this.modal.create({
      nzTitle: '安防预警信息详情',
      nzWidth: '70%' ,
      nzFooter: null,
      nzContent: DetailComponent,
      nzComponentParams: {
        data: data,
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
  }

  openHandle(data){
    this.modal.create({
      nzTitle: '处理预警信息',
      nzWidth: 1100 ,
      nzFooter: null,
      nzContent: HandleSecurityWarnComponent,
      nzComponentParams: {
        data: data,
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
  }
}
