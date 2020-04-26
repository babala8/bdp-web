import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { SYS_CONS } from '../../../models/constant';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppService } from '../../../app.service';
import { HttpResponse } from '@angular/common/http';
import { CirculationService } from '../circulation.service';
import * as add_days from 'date-fns/add_days';
import { HandheldsReceiveAddComponent } from './add/handhelds-receive-add.component';
import { HandheldsReceiveReviewComponent } from './review/handhelds-receive-review.component';
import { HandheldsReceiveReturnComponent } from './return/handhelds-receive-return.component';
import { HandheldsReceiveDetailComponent } from './detail/handhelds-receive-detail.component';

@Component({
  selector: 'app-reader-info-flow',
  templateUrl: './handhelds-receive.component.html',
})

export class HandheldsReceiveComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();
  dateRange = [new Date(), new Date()];

  rUesStatus = SYS_CONS.TAGREADER_USE_STATUS;
  cFlag = SYS_CONS.CRASH_FLAG;


  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: CirculationService) {

  }

  ngOnInit() {
    this.reset();
  }


  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      crashFlag: this.formModel['crashFlag'] || '',
      requestOpNo: this.formModel['requestOpNo'] && this.formModel['requestOpNo'].trim()|| '',
      tagReaderNo: this.formModel['tagReaderNo'] && this.formModel['tagReaderNo'].trim()|| '',
      requestStartDate: this.formModel['requestStartDate'] ? this.formModel['requestStartDate'].format('YYYY-MM-DD') : '',
      requestEndDate: this.formModel['requestEndDate'] ? this.formModel['requestEndDate'].format('YYYY-MM-DD') : '',
      tagReaderUseStatus: this.formModel['tagreaderUseStatus'] || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    this.loading = true;
    this.service.getReaderFlow(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach((value, index) => {
          for (let i of this.rUesStatus) {
            if (i.no === this.dataSet[index].tagreaderUseStatus) {
              this.dataSet[index]['tagreaderUseName'] = i.name;
            }
          }
          for (let i of this.cFlag) {
            if (i.no === this.dataSet[index].crashFlag) {
              this.dataSet[index]['crashFlagName'] = i.name;
            }
          }
        });
        console.log(this.dataSet);
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  reset() {
    this.formModel['requestEndDate'] = new Date();
    this.formModel['requestStartDate'] = add_days(new Date(), -7);
    this.formModel['crashFlag'] = null;
    this.formModel['requestOpNo'] = null;
    this.formModel['tagReaderNo'] = null;
    this.formModel['tagreaderUseStatus'] = null;
    this.refreshData(true);
  }

  onDateChange(result: Date): void {
    this.formModel['requestStartDate'] = result[0];
    this.formModel['requestEndDate'] = result[1];
  }

  delKey(id) {
    this.service.delReaderFlow(id)
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openResive(data) {
    this.modal.create({
      nzTitle: '审核领用申请',
      nzFooter: null,
      nzContent: HandheldsReceiveReviewComponent,
      nzComponentParams: {
        data: data,
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

  openRturn(data) {
    this.modal.create({
      nzTitle: '归还手持机',
      nzFooter: null,
      nzContent: HandheldsReceiveReturnComponent,
      nzComponentParams: {
        data: data,
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


  openAdd() {
    this.modal.create({
      nzTitle: '添加手持机领用',
      nzFooter: null,
      nzContent: HandheldsReceiveAddComponent,
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
        this.refreshData(true);
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });
  }

  openDetail(data) {
    this.modal.create({
      nzTitle: '领用详情',
      nzFooter: null,
      nzWidth: '60%',
      nzContent: HandheldsReceiveDetailComponent,
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

}
