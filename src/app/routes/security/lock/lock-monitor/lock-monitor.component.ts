import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {Page} from '../../../../models/page';
import * as _ from 'lodash';
import { SYS_CONS } from '../../../../models/constant';
import { LockService } from '../lock.service';
@Component({
  templateUrl: './lock-monitor.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class LockMonitorComponent implements OnInit {
  loading = false;
  dataSet = [];
  page = new Page();
  formModel = {};
  interval;
  expandForm = false;
  lockTransType = SYS_CONS.LOCK_TRANS_TYPE;

  constructor(private service: LockService,
              private modal: NzModalService,
              private message: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.refreshData(true);
  }

  ngOnDestroy() {}

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
    params['updateTime'] = this.formModel['updateTime'] ? this.formModel['updateTime'].format('YYYY-MM-DD') : '';

    this.service.getLockMonitor(params)
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
    this.formModel = {};
    this.refreshData(true);
  }

}
