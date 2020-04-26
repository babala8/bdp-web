import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {Page} from '../../../../models/page';
import * as _ from 'lodash';
import { AddLockComponent } from './add/add-lock.component';
import { SYS_CONS } from '../../../../models/constant';
import { ModLockComponent } from './mod/mod-lock.component';
import { LockService } from '../lock.service';
@Component({
  templateUrl: './lock-info.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class LockInfoComponent implements OnInit {
  loading = false;
  dataSet = [];
  page = new Page();
  formModel = {};
  interval;
  expandForm = false;
  lockStatus = SYS_CONS.LOCK_STATUS;
  constructor(private service: LockService,
              private modal: NzModalService,
              private message: NzMessageService,
              ) {
  }

  ngOnInit() {
    this.formModel['installTime'] = null;
    this.formModel['madeDate'] = null;
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
    params['installDate'] = this.formModel['installDate'] ? this.formModel['installDate'].format('YYYY-MM-DD') : '';
    params['madeDate'] = this.formModel['madeDate'] ? this.formModel['madeDate'].format('YYYY-MM-DD') : '';

    this.service.getLockInfo(params)
      .subscribe(_data => {
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
    this.formModel['installTime'] = null;
    this.formModel['madeDate'] = null;
    this.refreshData(true);
  }

  openAdd() {
    this.modal.create({
      nzTitle: '新增锁具',
      nzWidth: '60%' ,
      nzFooter: null,
      nzContent: AddLockComponent,
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }
  openMod(data) {
    this.modal.create({
      nzTitle: '修改锁具',
      nzWidth: '60%' ,
      nzFooter: null,
      nzContent: ModLockComponent,
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

  delLock(lockcode) {
    this.service.delLock(lockcode)
      .subscribe(_data => {
        this.loading = false;
        this.refreshData(false);
        this.message.success(
          `锁具删除成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}
