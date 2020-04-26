import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';

@Component({
  templateUrl: './dev-manage-revise.html',
  styleUrls: ['./dev-manage-revise.less'],
})

export class DevManageReviseComponent implements OnInit {
  formModel = {};
  devInfo;
  periodList = [];
  lineList = [];
  addClrPeriodInfo = {
    addClrPeriod: 0,
    maxAddClrPeriod: 0,
    timeList: [],
  };
  loading = false;
  submit_loading = false;

  constructor(private service: ChannelCenterService,
    private message: NzMessageService,
    private nzModal: NzModalRef) {
  }

  ngOnInit() {
    this.qryAddClrPeriodInfo();
  }

  qryAddClrPeriodInfo() {
    this.loading = true;
    this.service.qryDevClrTime(this.devInfo.no)
      .subscribe(_data => {
        this.loading = false;
        _data.timeList.forEach(element => {
          element.theDay = element.clrDay;
          element.lineNo = element.addnotesLine;
        });
        this.addClrPeriodInfo = _data;
        this.getLineList();
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  getLineList() {
    const params = { clrCenterNo: this.devInfo.clrCenterNo };
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
        this.dataProcess();
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  dataProcess() {
    for (let i = 1; i <= this.devInfo.addClrPeriod; i++) {
      const addClrInfo = {
        lineNoAM: this.devInfo.addnotesLine,
        lineNoPM: this.devInfo.addnotesLine,
        theDay: i,
        flagAM: false,
        flagPM: false,
        arrivalTimeAM: this.stringToTime("10:00:00", 2),
        arrivalTimePM: this.stringToTime("15:00:00", 2),
      }
      this.periodList = [...this.periodList, addClrInfo];
    }
    if (this.addClrPeriodInfo.timeList.length !== 0) {
      for (let i = 0; i < this.addClrPeriodInfo.timeList.length; i++) {
        const element = _.find(this.periodList, value => value.theDay == this.addClrPeriodInfo.timeList[i].theDay);
        if (element) {
          if (this.addClrPeriodInfo.timeList[i].clrTimeInterval === 1) {
            element.arrivalTimeAM = this.stringToTime(this.addClrPeriodInfo.timeList[i].arrivalTime, 2);
            element.flagAM = true;
            element.theDay = this.addClrPeriodInfo.timeList[i].theDay;
            element.lineNoAM = this.addClrPeriodInfo.timeList[i].lineNo;
          } else {
            element.arrivalTimePM = this.stringToTime(this.addClrPeriodInfo.timeList[i].arrivalTime, 2);
            element.flagPM = true;
            element.theDay = this.addClrPeriodInfo.timeList[i].theDay;
            element.lineNoPM = this.addClrPeriodInfo.timeList[i].lineNo;
          }

        }
      }
    }
  }

  periodListInit(value: string): void {
    const listSize = parseInt(value, 10);
    let i = 0;
    const periodListLength = this.periodList.length;
    if (listSize < this.periodList.length) {
      for (i = 0; i < periodListLength - listSize; i++) {
        this.periodList = [...this.periodList.pop()];
      }
    }
    else {
      for (i = 0; i < listSize - periodListLength; i++) {
        const addClrInfo = {
          lineNoAM: this.devInfo.addnotesLine,
          lineNoPM: this.devInfo.addnotesLine,
          theDay: this.periodList.length + 1,
          flagAM: false,
          flagPM: false,
          arrivalTimeAM: this.stringToTime("10:00:00", 2),
          arrivalTimePM: this.stringToTime("15:00:00", 2),
        }
        this.periodList = [...this.periodList, addClrInfo];
      }
    }
  }

  stringToTime(timeString, type) {// type=1： 格式化为HH:MM; 2:格式化为HH:MM:SS
    const date = new Date();
    if (!timeString) {
      return;
    }
    date.setHours(timeString.substring(0, timeString.indexOf(':')));
    if (type === 1) {
      date.setMinutes(timeString.substring(timeString.indexOf(':') + 1));
    }
    if (type === 2) {
      date.setMinutes(timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':')));
      date.setSeconds(timeString.substring(timeString.lastIndexOf(':') + 1));
    }
    return date;
  }

  timeChangeAM(data) {
    if (data.flagAM) {
      data.flagPM = false;
    }
  }

  timeChangePM(data) {
    if (data.flagPM) {
      data.flagAM = false;
    }
  }

  formatTime(date) {
    if (date == null) {
      return null;
    }
    const cDay = this.formatNumber(date.getHours()) + ':' + this.formatNumber(date.getMinutes()) + ':' + this.formatNumber(date.getSeconds());
    return cDay;
  }

  formatNumber(num) {
    return ('' + num).length < 2 ? '0' + num : '' + num;
  }

  submit() {
    // if(this.addClrPeriodInfo.addClrPeriod > this.addClrPeriodInfo.maxAddClrPeriod){
    //     this.message.warning('加钞循环周期不能大于最大清机周期！');
    //     return;
    // }

    const timeList = [];
    this.periodList.forEach(myPeriodinfo => {
      const data = {
        clrTimeInterval: null,
        arrivalTime: null,
        theDay: null,
        lineNo: null
      }
      if (myPeriodinfo.flagAM) {
        data.clrTimeInterval = 1;
        data.arrivalTime = this.formatTime(myPeriodinfo.arrivalTimeAM);
        data.lineNo = myPeriodinfo.lineNoAM;
        data.theDay = myPeriodinfo.theDay;
        timeList.push(data);
      } else if (myPeriodinfo.flagPM) {
        data.clrTimeInterval = 2;
        data.arrivalTime = this.formatTime(myPeriodinfo.arrivalTimePM);
        data.lineNo = myPeriodinfo.lineNoPM;
        data.theDay = myPeriodinfo.theDay;
        timeList.push(data);
      }
    });
    if (timeList.length === 0) {
      this.message.warning("线路不能为空,请选择后再提交");
      return;
    }
    const params = {
      devNo: this.devInfo.no,
      addClrPeriod: this.addClrPeriodInfo.addClrPeriod,
      maxAddClrPeriod: this.addClrPeriodInfo.maxAddClrPeriod,
      timeList: timeList.map(time => {
        return {
          addnotesLine: time.lineNo,
          arrivalTime: time.arrivalTime,
          clrDay: time.theDay,
          clrTimeInterval: time.clrTimeInterval
        }
    }),
    }
    let lineNo = "";
    let flag = false;
    let theDay = 0;
    timeList.forEach((item, i) => {
      if (i === 0) {
        lineNo = item.lineNo;
      } else if (lineNo !== item.lineNo) {
        flag = true;
        theDay = i + 1;
        return;
      }
    });
    if (flag) {
      this.message.warning("线路号不一致,请重新选择");
      return;
    }
    this.submit_loading = true;
    this.service.modDevClrTime(params)
      .subscribe(_data => {
        this.submit_loading = false;
        this.lineList = _data.retList;
        this.message.success(
          `修改设备加钞周期信息成功！`
        );
        this.nzModal.destroy('onOk');
      }, (error) => {
        this.submit_loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  newArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  disabledHoursPM = () => {
    const hours = this.newArray(0, 12);
    return hours;
  };

  disabledHoursAM = () => {
    const hours = this.newArray(12, 24);
    return hours;
  };
}
