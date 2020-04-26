import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { OrgManageService } from '../org-manage.service';

@Component({
  templateUrl: './org-revise.html',
  styleUrls: ['./org-revise.less'],
})

export class OrgReviseComponent implements OnInit {
  formModel = {};
  orgInfo;
  periodList = [];
  tempEditObject = {};
  editRow = null;
  loading = false;
  orgBusinessTime = [];
  timeShowList = [];  // 保存网点营业时间显示信息
  weekList = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];  // 星期时间列表
  intervalList = ['上午', '下午'];    // 上下午列表

  constructor(private orgService: OrgManageService,
              private message: NzMessageService,
              private nzModal: NzModalRef) {
  }

  ngOnInit() {
    this._timeShowListInit();
    this.qryorgBusinessTime();
  }

  qryorgBusinessTime() {
    this.loading = true;
    this.orgService.qryOrgBusinessTime({orgNo: this.orgInfo.no})
      .subscribe(_data => {
        this.loading = false;
        this.orgBusinessTime = _data['retList'];
        // 更新网点营业时间显示
        this.orgBusinessTime.forEach(item => {
          item.selected = true;
          this.timeShowList[item.orgDay - 1][item.orgTimeInterval - 1] = Object.assign({}, item,
            { openTime: this.stringToTime(item.openTime, 2), closeTime: this.stringToTime(item.closeTime, 2)});
        });
      }, (error) => {
        this.loading = false;
      });
  }

  // 初始化营业时间显示
  _timeShowListInit() {
    for (let i = 1; i <= 7; i++) {
      this.timeShowList[i-1] = [];
      for (let j = 1; j <= 2; j++) {
        this.timeShowList[i-1].push({
          selected: false,
          orgTimeInterval: j,
          orgDay: i,
          openTime: this.stringToTime(j == 1 ? '09:00:00': '14:00:00', 2),
          closeTime: this.stringToTime(j == 1 ? '12:00:00': '17:00:00', 2),
        })
      }
    }
  }

  // 提交修改信息
  submit() {
    const businessTimeList = [];
    this.timeShowList.forEach(dayTime => {
      dayTime.forEach(item => {
        if (item.selected) {
          businessTimeList.push(Object.assign({}, item, {openTime: this.formatTime(item.openTime), closeTime: this.formatTime(item.closeTime)}));
        }
      })
    });
    const params = {
      orgNo: this.orgInfo.no,
      businessTimeList,
    };
    this.loading = true;
    this.orgService.modOrgBusiness(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success(`修改营业时间信息成功！`);
        this.nzModal.triggerOk();
      }, (error) => {
        this.loading = false;
      });
  }

  // 将字符串转化为时间
  stringToTime(timeString, type) {// type=1： 格式化为HH:MM; 2:格式化为HH:MM:SS
    const time = new Date();
    if (!timeString) {
      return;
    }
    time.setHours(timeString.substring(0, timeString.indexOf(':')));
    if (type === 1) {
      time.setMinutes(timeString.substring(timeString.indexOf(':') + 1));
    }
    if (type === 2) {
      time.setMinutes(timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':')));
      time.setSeconds(timeString.substring(timeString.lastIndexOf(':') + 1));
    }
    return time;
  }

  // 生成不可选小时列表
  newDisableArray = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // 返回不可选小数数组
  disableHours = flag => {
    return () => flag == 1 ? this.newDisableArray(13, 25) : this.newDisableArray(0, 12);
  }

  // 格式化时间
  formatTime(time) {
    if (time == null) {
      return null;
    }
    const formatedTime = this.formatNumber(time.getHours()) + ':' + this.formatNumber(time.getMinutes()) + ':' + this.formatNumber(time.getSeconds());
    return formatedTime;
  }

  // 格式化数字
  formatNumber(num) {
    return ('' + num).length < 2 ? '0' + num : '' + num;
  }
}
