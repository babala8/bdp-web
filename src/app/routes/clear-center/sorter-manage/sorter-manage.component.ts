import {Component, OnInit} from '@angular/core';
import {NzModalService, NzMessageService} from 'ng-zorro-antd';
import {ClearCenterService } from '../clear-center.service';
import {SorterAddComponent} from './add/sorter-add.component';
import {SorterModifyComponent} from './mod/sorter-modify.component';
import { HttpResponse } from '@angular/common/http';
import { Page } from '../../../models/page';
import { SYS_CONS } from '../../../models/constant';
import * as _ from 'lodash';

@Component({
  templateUrl : './sorter-manage.component.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `]
})
export class SorterManageComponent implements OnInit {
  expandForm = false;
  loading;
  dataList = [];
  formModel = {};
  page = new Page();
  statusList = SYS_CONS.DEV_STATUS;
  typeList = SYS_CONS.DEV_TYPE;

  constructor(private service: ClearCenterService,
              private nzModal: NzModalService,
              private message: NzMessageService) {}

  ngOnInit(): void {
    this.refreshData(true);
  }

  refreshData(reset = false) {
    this.loading = true;
    if (reset) {
      this.page.curPage = 1;
    }
    const params = _.extend({}, this.page, {
      devModel : this.formModel['devModel'] || '',
      devNo : this.formModel['devNo'] || '',
      devStatus : this.formModel['devStatus'] || '',
      devType : this.formModel['devType'] || '',
      clrCenterNo :  this.formModel['clrCenterNo']|| '',
    });
    this.service.getDevCount(params)
        .subscribe(_data => {
          this.loading = false;
          console.log(_data);
          this.dataList = _data['retList'];
          this.page.totalRow = _data['totalRow'];
          this.page.totalPage = _data['totalPage'];
        }, (error) => {
          this.loading = false;
          console.log(error);
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }
        });
  }

  search() {
    this.refreshData(true);
  }

  openAdd () {
    const modal = this.nzModal.create({
      nzTitle: '添加清分机',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: 800,
      nzContent: SorterAddComponent,
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    const modal = this.nzModal.create({
      nzTitle: '修改清分机信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '50%',
      nzContent: SorterModifyComponent,
      nzComponentParams: {
        devCount: item
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(no) {
    this.service.delDevCount(no)
        .subscribe(_data => {
          console.log(_data);
          this.message.success('删除成功');
          this.refreshData(false);
        }, (error) => {
          console.log(error);
          if (error instanceof HttpResponse) {
            this.message.error(error.body.retMsg);
          }

        });
  }
}
