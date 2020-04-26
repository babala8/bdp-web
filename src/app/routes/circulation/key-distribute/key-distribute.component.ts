import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { SessionService } from '../../../core/session.service';
import { AppService } from '../../../app.service';
import { Page } from '../../../models/page';
import { CirculationService } from '../circulation.service';

@Component({
  templateUrl: 'key-distribute.component.html',
})

export class KeyDistributeComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private session: SessionService,
              private service:CirculationService
              ) {

    console.log('11111',this.session.token)
  }

  ngOnInit() {
    this.refreshData(true);
  }

  // openDetail(dispatchNo) {
  //   const window = this.modal.create({
  //     nzTitle: '加钞任务单详情',
  //     nzWidth: '98%',
  //     nzFooter: 'false',
  //     // nzContent: DispatchDetailComponent,
  //     nzComponentParams: {
  //       dispatchNo: dispatchNo
  //     },
  //     nzOnOk: () => {
  //       // 【成功时】，刷新数据，并回到第一页
  //     },
  //     nzOnCancel: () => {
  //       // 一般情况，【取消时】，什么都不做
  //     },
  //   });
  //   this.appService.pushModal(window);
  // }


  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
      this.selectItem = [];
    }

    const params = _.extend({}, this.formModel, this.page, {
      // startDate: this.formModel['startDate'] ? this.formModel['startDate'].format() : '',
      // endDate: this.formModel['endDate'] ? this.formModel['endDate'].format() : ''
    });

    this.loading = true;
    this.service.getKeyDistribute(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach(dispatch => {
          if (_.filter(this.selectItem, { dispatchNo: dispatch.dispatchNo }).length > 0) {
            dispatch.checked = true;
          }
          if(dispatch.lineName == null){
            dispatch.lineName = "临时线路" + dispatch.lineNo.substring(dispatch.lineNo.length - 2);
          }
          if(dispatch.status === 3){
            dispatch.background = "#A9A9A9"
          }
        });
        this._refreshStatus();
        this.page.totalRow = _data['totalRow'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  // reset() {
  //   this.formModel['startDate'] = new Date();
  //   this.formModel['endDate'] = add_days(new Date(), 7);
  //   this.formModel['dispatchNo'] = null;
  //   this.formModel['addnotesPlanNo'] = null;
  //   this.formModel['clrCenterNo'] = null;
  //   this.formModel['lineNo'] = null;
  //   this.formModel['status'] = null;
  //   this.refreshData(true);
  // }

  // changeItem(event, data) {
  //   let hasElement = _.filter(this.selectItem, { dispatchNo: data.dispatchNo }).length > 0;
  //   if (!hasElement && event) {
  //     this.selectItem.push(data);
  //   } else if (hasElement && !event) {
  //     _.pullAllBy(this.selectItem, [{ 'dispatchNo': data.dispatchNo }], 'dispatchNo');
  //   }
  // }

  // cancel(dispatchNo) {
  //   this.service.cancel( dispatchNo )
  //     .subscribe(_data => {
  //       this.message.success('取消成功！');
  //       this.refreshData(true);
  //     }, (error) => {
  //       if (error instanceof HttpResponse) {
  //         this.message.error(error.body.retMsg);
  //       }
  //     });
  // }

  _allChecked = false;
  _operating = false;
  _indeterminate = false;
  selectItem: Array<any> = [];

  _refreshStatus() {
    const allChecked = this.dataSet.every(value => value.checked === true);
    const allUnChecked = this.dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  // _checkAll(value) {
  //   this.dataSet.forEach(data => { data.checked = value, this.changeItem(value, data) });
  //   this._refreshStatus();
  // }



  // mapRouter(data) {
  //     console.log('line', data)
  //     const GroupMapModal = this.modal.create({
  //         nzTitle: `加钞线路图[${data.dispatchNo}]`,
  //         nzWidth: '95%',
  //         nzContent: GroupMapComponent,
  //         nzComponentParams: {
  //             addnotesPlanNo: data.addnotesPlanNo,
  //             groupNo: `${data.lineNo}`
  //         },
  //         nzFooter: 'false'
  //     });
  //     this.appService.pushModal(GroupMapModal);
  // }



}
