import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {forEach} from '@angular/router/src/utils/collection';
import * as _ from 'lodash';
import {NetpointLineArrangeService} from '../netpoint-line-arrange.service';

@Component({
  templateUrl: './netpoint-line-arrange-mod.html',
  styleUrls: ['./netpoint-line-arrange-mod.less'],
  // encapsulation: ViewEncapsulation.Native
})
export class NetpointLineArrangeModComponent implements OnInit {
  loading = false;
  tempEditObject = {};
  editRow = null;
  lineRunMapDetailInfo;
  lineRunMapDetail;
  runDate;
  orgKey;
  disabledHours;
  time = null;
  timeList = [
    {label: "上午", value: "1"},
    {label: "下午", value: "2"}
  ];

  constructor(private fb: FormBuilder,
              private service: NetpointLineArrangeService,
              private nzModal: NzModalRef,
              private session: SessionService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.runDate = this.lineRunMapDetail.theYearMonth + '-' + this.lineRunMapDetail.theDay;
    this.lineRunMapDetailInfo = {};
    this.lineRunMapDetailInfo = _.cloneDeep(this.lineRunMapDetail);
    this.refreshData();
  }

  refreshData() {
    this.orgKey = 0;
    this.lineRunMapDetailInfo.detailList.forEach((network) => {
      network.key = this.orgKey;
      this.orgKey += 1;
      this.tempEditObject[network.key] = {};
    });
  }

  edit(data) {
    this.tempEditObject[data.key] = {...data};
    console.log(this.tempEditObject);
    this.editRow = data.key;
  }

  save(data) {
    Object.assign(data, this.tempEditObject[data.key]);
    this.editRow = null;
  }

  cancel(data) {
    this.tempEditObject[data.key] = {};
    this.editRow = null;
  }

  delete(key) {
    console.log(key);
    this.lineRunMapDetailInfo.detailList.splice(key, 1);
    this.lineRunMapDetailInfo.detailList = [...this.lineRunMapDetailInfo.detailList];
    this.refreshData();
  }

  addOrg() {
    const orgInfo = {};
    this.editRow = this.lineRunMapDetailInfo.detailList.push(orgInfo);
    this.lineRunMapDetailInfo.detailList = [...this.lineRunMapDetailInfo.detailList];
    this.refreshData();
  }

  submit() {
    this.lineRunMapDetailInfo.runDate = this.runDate;
    console.log(this.lineRunMapDetailInfo);

    this.service.modNetworkLineRunMap(this.lineRunMapDetailInfo).subscribe(_data => {
      this.loading = false;
      this.message.success(`修改路线表信息成功！`);
      this.nzModal.triggerOk();
    }, (error) => {
      this.loading = false;
      console.log(error);
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  formatDay(date) {
    if (date == null) {
      return null;
    }
    const cDay = this.formatNumber(date.getHours()) + ':' + this.formatNumber(date.getMinutes()) + ':' + this.formatNumber(date.getSeconds());
    return cDay;
  }

  formatNumber(num) {
    return ('' + num).length < 2 ? '0' + num : '' + num;
  }

  newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

}

