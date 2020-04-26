import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { Page } from '../../../../models/page';
import { SessionService } from '@core';
import { DtdLineArrangeService } from './dtd-line-arrange.service';
import { DtdLineArrangeDetailComponent } from './dtd-line-arrange-detail/dtd-line-arrange-detail.component';
import { DtdLineArrangeAddComponent } from './dtd-line-arrange-add/dtd-line-arrange-add.component';

@Component({
  templateUrl: './dtd-line-arrange.html',
})
export class DtdLineArrangeComponent implements OnInit {
  formModel = {};
  page = new Page();
  dataSet = [];
  loading = false;

  constructor(
    private service: DtdLineArrangeService,
    private message: NzMessageService,
    private session: SessionService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this._refreshData(true);
    console.log(this.session.token)
  }

  _refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const formData = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      lineNo: this.formModel['lineNo'] || '',
      startMonth: this.formModel['startMonth']? this.formModel['startMonth'].format('YYYY-MM') : '',
      endMonth: this.formModel['endMonth']? this.formModel['endMonth'].format('YYYY-MM') : '',
    };
    const params = Object.assign({}, formData, this.page);
    console.log(params)
    this.loading = true;
    this.service.getDtdByPage(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.curRow = _data['curRow'];
        this.page.totalPage = _data['totalPage'];
        this.loading = false;
      });
  }

  search() {
    this._refreshData(true);
  }

  openAdd() {
    const modal = this.modal.create({
      nzTitle: '添加上门线路排班',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: DtdLineArrangeAddComponent,
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openDayDetail(data,isEdit) {
    const modal = this.modal.create({
      nzTitle: '上门线路排班信息',
      nzContent: DtdLineArrangeDetailComponent,
      nzWidth: 1000,
      nzComponentParams: {
        dataPrams: data,
        isEdit: isEdit
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
        if(this.service.status){
          this.search()
        }
      },
      nzFooter: null,
    });
  }

  _startValueChange = () => {
    if (this.formModel['startMonth'] > this.formModel['endMonth']) {
      this.formModel['endMonth'] = null;
    }
  };

  _endValueChange = () => {
    if (this.formModel['startMonth'] > this.formModel['endMonth'] && this.formModel['endMonth'] != null) {
      this.formModel['startMonth'] = null;
    }
  };
}
