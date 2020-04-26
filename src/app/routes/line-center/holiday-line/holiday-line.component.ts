import {Component, OnInit} from '@angular/core';
import {Page} from '../../../models/page';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {AppService} from '../../../app.service';
import {HttpResponse} from '@angular/common/http';
import * as _ from 'lodash';
import {HolidayLineService} from './holiday-line.service';
import {HolidayLineDayDetailComponent} from './holiday-line-day-detail/holiday-line-day-detail.component';
import {HolidayLineDayModComponent} from './holiday-line-day-mod/holiday-line-day-mod.component';
import {HolidayLineBatchModComponent} from './holiday-line-batch-mod/holiday-line-batch-mod.component';

@Component({
  templateUrl: './holiday-line.html',
})
export class HolidayLineComponent implements OnInit {

  loading = false;
  expandForm = false;
  dataSet = [];
  page = new Page();
  formModel = [];
  lineList;
  lineRunMapDetailInfoList;
  nextMonthDay = new Date();

  constructor(private modal: NzModalService,
              private message: NzMessageService,
              private appService: AppService,
              private service: HolidayLineService,
  ) {
  }

  ngOnInit() {
    this.formModel['startMonth'] = null;
    this.formModel['endMonth'] = null;
    this.reset();
  }

  search() {
    this.refreshData(true);
  }

  reset() {
    _.extend(this.formModel, {
      clrCenterNo: null,
      networkLineNo: null,
      lineNo: null,
      startMonth: null,
      endMonth: null,
    });
    this.getLineList('clrCenterNo');
    this.search();
  }

  getLineList(value: string): void {
    const params = {clrCenterNo: value};
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      clrCenterNo: this.formModel['clrCenterNo'],
      networkLineNo: this.formModel['lineNo'],
      startMonth: this.formatDay(this.formModel['startMonth']),
      endMonth: this.formatDay(this.formModel['endMonth']),
      pageSize: this.page.pageSize,
      curPage: this.page.curPage,
    };

    this.service.qryNetworkRunMapByPage(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  curClrCenterNo;

  getClrCenterNo(value) {
    if (!this.curClrCenterNo) {
      this.curClrCenterNo = value;
      this.refreshData(true);
    }
  }

  openAllMod() {
    const nzModalSubject = this.modal.create({
      nzTitle: '批量修改线路信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '80%',
      nzZIndex: 990,
      nzContent: HolidayLineBatchModComponent,
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  openDayDetail(lineRunMapInfo) {
    const nzModalSubject = this.modal.create({
      nzTitle: '网点线路运行图详细信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: HolidayLineDayDetailComponent,
      nzWidth: '90%',
      nzComponentParams: {
        theYearMonth: lineRunMapInfo.theYearMonth,
        networkLineNo: lineRunMapInfo.lineNo
      },
      nzOnOk: () => {
      },
      nzOnCancel: () => {
      },
    });
  }

  mod(lineRunMapInfo) {
    const nzModalSubject = this.modal.create({
      nzTitle: '修改网点线路运行图',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: HolidayLineDayModComponent,
      nzWidth: '60%',
      nzZIndex: 998,
      nzComponentParams: {
        theYearMonth: lineRunMapInfo.theYearMonth,
        networkLineNo: lineRunMapInfo.lineNo
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  //时间转换
  formatDay(date) {
    if (date == null) {
      return null;
    }
    const cDay = date.getFullYear() + '-' +
      (date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    return cDay;
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
  //
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.formModel['endMonth']) {
      return false;
    }
    return startValue.getTime() > this.formModel['endMonth'].getTime();
  };

  _disabledEndDate = (endValue) => {
    if (!endValue || !this.formModel['startMonth']) {
      return false;
    }
    return endValue.getMonth() <= this.formModel['startMonth'].getMonth() - 1;
  };
}
