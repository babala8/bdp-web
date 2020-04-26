import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import * as _ from 'lodash';

@Component({
  templateUrl: './atm-line-arrange-dev-detail.html',
  styleUrls: ['./atm-line-arrange-dev-detail.less'],
})
export class ATMLineArrangeDevDetailComponent implements OnInit {
  lineRunMapDetail;
  devList;
  runDate;

  constructor() {
  }

  ngOnInit() {
    console.log(this.lineRunMapDetail.detailList);
    this.runDate = this.lineRunMapDetail.theYearMonth + '-' + this.lineRunMapDetail.theDay;
    this.devList = this.lineRunMapDetail.detailList;
  }
}

