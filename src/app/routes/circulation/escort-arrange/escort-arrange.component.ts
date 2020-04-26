import { Component, OnInit } from '@angular/core';
import { CirculationService } from '../circulation.service';
import { EscortArrangeAddComponent } from './add/escort-arrange-add.component';
import { EscortArrangeModifyComponent } from './mod/escort-arrange-modify.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from '../../../models/page';
import * as _ from 'lodash';
import { SessionService } from '../../../core/session.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: './escort-arrange.html',
})

export class EscortArrangeComponent implements OnInit {
  formModel = {};
  page = new Page();
  dataSet = [];
  loading = false;
  _allChecked = false;
  _operating = false;
  _indeterminate = false;
  selectItem: Array<any> = [];

  constructor(
    private service: CirculationService,
    private message: NzMessageService,
    private session: SessionService,
    private modal: NzModalService
  ) { }

  _refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const formData = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      lineNo: this.formModel['lineNo'] || '',
      startDate: this.formModel['startDate']? this.formModel['startDate'].format('YYYY-MM-DD') : '',
      endDate: this.formModel['endDate']? this.formModel['endDate'].format('YYYY-MM-DD') : '',
    };
    const params = Object.assign({}, formData, this.page);
    console.log(params);
    this.service.getEscortByPage(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data['retList'];
        this.dataSet.forEach(data => {
          data.checked = false;
          if (_.filter(this.selectItem, { lineRunNo: data.lineRunNo }).length > 0) {
            // 匹配已选中的信息
            data.checked = true;
          }
          const outsourcingList = [];
          const outSourcingArr = [];
          data.outsourcingList.forEach(element => {
            outsourcingList.push(element.name);
            outSourcingArr.push(element.no);
          });
          data.outSourcingArr = outSourcingArr;
          data.outSourcingName = outsourcingList.join('、');
        })

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

  ngOnInit(): void {
    this._refreshData(true);
    console.log(this.session.token)
  }


  changeItem(event, data) {
    const hasElement = _.filter(this.selectItem, { lineRunNo: data.lineRunNo }).length > 0;
    if (!hasElement && event) {
      this.selectItem.push(data);
    } else if (hasElement && !event) {
      _.pullAllBy(this.selectItem, [{ lineRunNo: data.lineRunNo }], 'lineRunNo');
    }
  }

  _refreshStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    this.dataSet.forEach(data => { data.checked = value, this.changeItem(value, data); });
    this._refreshStatus();
  }

  export() {
    this._operating = true;
    const noArr = [];
    this.selectItem.forEach(element => {
      noArr.push(element.lineRunNo);
    });
    if(!noArr.length) return this.message.error('请选择需要导出的信息！')

    this.service.exportOutLineRunMap(noArr).subscribe(data =>{
      console.log(data)
    },error => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    })
  }


  deleteEscort(data) {
    this.service.deleteEscort(data.lineRunNo).subscribe(r => {
      this.message.success(
        `删除成功！`,
      );
      this._refreshData(true);
    }, (error) => {
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  modify(data) {
    this.modal.create({
      nzTitle: '修改排班信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: EscortArrangeModifyComponent,
      nzComponentParams: {
        escortInfo: data,
      },
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openAdd() {
    this.modal.create({
      nzTitle: '生成押运人员排班',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: 650,
      nzContent: EscortArrangeAddComponent,
      nzOnOk: () => {
        this._refreshData(true);
      },
      nzOnCancel: () => {
      },
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
