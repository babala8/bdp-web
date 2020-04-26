import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {forEach} from '@angular/router/src/utils/collection';
import * as _ from 'lodash';
import {HolidayLineService} from '../holiday-line.service';

@Component({
  templateUrl: './holiday-line-mod.html',
  styleUrls: ['./holiday-line-mod.less'],
})
export class HolidayLineModComponent implements OnInit {
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
              private service: HolidayLineService,
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

  // stringToTime(timeString, type) {//type=1： 格式化为HH:MM; 2:格式化为HH:MM:SS
  //     const date = new Date();
  //     if(!timeString){
  //         return;
  //     }
  //     date.setHours(timeString.substring(0, timeString.indexOf(':')));
  //     if (type == 1) {
  //         date.setMinutes(timeString.substring(timeString.indexOf(':') + 1));
  //     }
  //     if (type == 2) {
  //         date.setMinutes(timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':')));
  //         date.setSeconds(timeString.substring(timeString.lastIndexOf(':') + 1));
  //     }
  //     return date;
  // }

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

  // disabledHoursPM = () => {
  //     const hours = this.newArray(0, 12);
  //     // hours.splice(20, 4);
  //     return hours;
  // };

  // disabledHoursAM = () => {
  //     const hours = this.newArray(12, 24);
  //     // hours.splice(20, 4);
  //     return hours;
  // };

  // selectHours(type){
  //     if(type == 1){
  //         this.disabledHours = this.disabledHoursAM;
  //     }else{
  //         this.disabledHours = this.disabledHoursPM;
  //     }
  // }
}

