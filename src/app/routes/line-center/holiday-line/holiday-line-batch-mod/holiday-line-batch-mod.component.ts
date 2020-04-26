import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { SessionService } from '@core/session.service';
import { getDateOfInterval } from '@core/utils';
import { HolidayLineService } from '../holiday-line.service';

@Component({
  templateUrl: 'holiday-line-batch-mod.html',
})

export class HolidayLineBatchModComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  formModel = {};
  startDate = null;
  endDate = null;
  flag = 0;

  constructor(
    private service: HolidayLineService,
    private nzModal: NzModalRef,
    private session: SessionService,
    private message: NzMessageService) {
  }

  addNoteDateList = [{ 'no': '1', 'name': '加钞' },
    { 'no': '2', 'name': '不加钞' }];
  lines = [];
  lineType;
  lintTypeList = [
    { 'no': '1', 'name': '网点调拨线路' },
  ];

  qryAllLine(clrCenterNo, init = false) {
    this.lines = [];
    // if(!init) this.formModel['lineNo'].setValue(null);
    // if(!clrCenterNo) return;

    if (this.formModel['lineNo'] == null || this.formModel['lineNo'] == '') {
      this.service.qryLineByType({
        clrCenterNo: clrCenterNo == null ? '028001' : clrCenterNo,
        lineType: this.formModel['lineType'] == null ? 1 : this.formModel['lineType'],
      })
        .subscribe(_data => {
          this.lines = _data.retList;
          console.log(this.lines);
          this.lines.forEach(element => {
            var checked = [];
            this.result.forEach(i => {
              checked[i] = false;
            });
            Object.assign(element, {
              checked: checked,
            });
          });
        });
    } else {
      // this.lines[0].description = this.formModel['lineNo'].lable;
      this.lines[0] = this.formModel['lineNo'];
      this.lines.forEach(element => {
        var checked = [];
        this.result.forEach(i => {
          checked[i] = false;
        });
        Object.assign(element, {
          checked: checked,
        });
      });
    }
  }

  curOrg = {
  };

  ngOnInit(): void {
    this.formModel['startDate'] = getDateOfInterval(-3);
    this.formModel['endDate'] = getDateOfInterval(3);
    this.getBetweenDateStr(getDateOfInterval(-3), getDateOfInterval(3));
    this.formModel['lineType'] = 1;
    this.getClrCenterNo(this.formModel['clrCenterNo']);
    this.getLineList(this.formModel['clrCenterNo']);
  }

  search() {
    if (this.formModel['startDate'].format() >= this.formModel['endDate'].format()) {
      this.message.warning('开始日期必须小于结束日期，请重新选择');
      return;
    }
    if (this.formModel['endDate'].getTime() - this.formModel['startDate'].getTime() > 15 * 24 * 60 * 60 * 1000) {
      this.message.warning('开始日期和结束日期间隔不能大于15天，请重新选择');
      return;
    }
    this.selectItem = [];
    this.qryAllLine(this.formModel['clrCenterNo'], true);
    this.getBetweenDateStr(this.formModel['startDate'], this.formModel['endDate']);
    this.lines.forEach(element => {
      var checked = [];
      this.result.forEach(i => {
        checked[i] = false;
      });
      Object.assign(element, {
        checked: checked,
      });
    });
    this.flag = 1;
  }

  reset() {
    _.extend(this.formModel, {
      // clrCenterNo: { no: this.curOrg.no, name: this.curOrg.name },
      startDate: getDateOfInterval(-3),
      endDate: getDateOfInterval(3),
      lineNo: null,
    });
    this.selectItem = [];
    // 重置后，默认查询金库1的线路
    this.formModel['clrCenterNo'] = '028001';
    this.search();
    this.formModel['clrCenterNo'] = null;
    this.formModel['lineType'] = null
  }

  arrList = [];
  addDateList = [];
  lineNo;
  allList = [];

  openSure() {
    this.loading = true;
    const params: any = {};
    params['startDate'] = this.result[0];
    params['endDate'] = this.result[this.result.length - 1];
    this.allList = [];
    this.selectItem.forEach(element => {
      this.lineNo = element.lineNo;

      console.log(element.checked);
      this.addDateList = [];
      for (var key in element.checked) { // 输出字典元素，如果字典的key是数字，输出时会自动按序输出
        // console.log(key + ' : ' + element.checked[key]);
        if (element.checked[key] == true) {
          this.addDateList.push(key);
        }
      }
      console.log(this.addDateList);

      this.arrList = Object.assign(element, {
        lineNo: this.lineNo,
        addDateList: this.addDateList,
      });
      this.allList.push(this.arrList);

    });
    params['lineInfoDTOList'] = this.allList;
    this.service.adjust(params).subscribe(_data => {
      console.log(params);
      this.loading = false;
      this.message.success(`成功！`);
      this.nzModal.triggerOk();
    }, (error) => {
      this.loading = false;
      console.log(error);
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }

  getLineList(value: string): void {
    const params = { clrCenterNo: value };
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lines = _data.retList;
      });
  }

  getClrCenterNo(value) {
    if (!this.formModel['clrCenterNo']) {
      this.formModel['clrCenterNo'] = value;
    }
  }

  _startValueChange = () => {

    if (this.formModel['startDate'] > this.formModel['endDate']) {
      this.formModel['endDate'] = null;
    }

  };

  _endValueChange = () => {
    if (this.formModel['startDate'] > this.formModel['endDate']) {
      this.formModel['startDate'] = null;
    }
  };

  _disabledStartDate = (startValue) => {
    if (!startValue || !this.formModel['endDate']) {
      return false;
    }
    return startValue.getTime() > this.formModel['endDate'].getTime();
  };

  _disabledEndDate = (endValue) => {
    if (!endValue || !this.formModel['startDate']) {
      return false;
    } else {
      return endValue.getTime() < this.formModel['startDate'].getTime();
    }
    // else{
    //   return  endValue.getTime() - this.formModel['startDate'].getTime()>15*24*60*60*1000;
    // }

  };

  //获取两个日期之间所有的日期
  result = [];
  retLength = 0;

  getBetweenDateStr(start, end) {
    this.result = [];
    var beginDay = start.format().split('-');
    var endDay = end.format().split('-');
    var diffDay = new Date();
    var dateList = new Array;
    var i = 0;
    diffDay.setDate(beginDay[2]);
    diffDay.setMonth(beginDay[1] - 1);
    diffDay.setFullYear(beginDay[0]);
    this.result.push(start.format());
    while (i == 0) {
      var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
      diffDay.setTime(countDay);
      dateList[2] = diffDay.getDate();
      dateList[1] = diffDay.getMonth() + 1;
      dateList[0] = diffDay.getFullYear();
      if (String(dateList[1]).length == 1) {
        dateList[1] = '0' + dateList[1];
      }
      ;
      if (String(dateList[2]).length == 1) {
        dateList[2] = '0' + dateList[2];
      }
      ;
      this.result.push(dateList[0] + '-' + dateList[1] + '-' + dateList[2]);
      if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
        i = 1;
      }
    }
    ;
    this.retLength = this.result.length;
    // console.log(result);
    // return result;
  };


  changeItem(event, data, item, lineNo) {
    let hasElement = _.filter(this.selectItem, { data: data }).length > 0;
    if (!hasElement && event) {
      Object.assign(data, {
        lineNo: lineNo,
      });
      this.selectItem.push(data);
    } else if (hasElement && !event) {
      _.pullAllBy(this.selectItem, [{ data: data }], 'content');
    }
  }

  selectItem: Array<any> = [];

}
