import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import {forEach} from '@angular/router/src/utils/collection';
import * as _ from 'lodash';
import { ATMLineArrangeService } from '../atm-line-arrange.service';

@Component({
    templateUrl: './atm-line-arrange-mod.html',
    styleUrls: ['./atm-line-arrange-mod.less'],
})
export class ATMLineArrangeModComponent implements OnInit {
    loading = false;
    tempEditObject = {};
    editRow = null;
    lineRunMapDetailInfo;
    lineRunMapDetail;
    runDate;
    devKey;
    disabledHours;
    time = null;
    timeList = [
        {label: '上午', value: '1'},
        {label: '下午', value: '2'}
    ];

    constructor(private service: ATMLineArrangeService,
                private nzModal: NzModalRef,
                private session: SessionService,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.runDate = this.lineRunMapDetail.theYearMonth + '-' + this.lineRunMapDetail.theDay;
        this.lineRunMapDetailInfo = {};
        this.lineRunMapDetailInfo = _.cloneDeep(this.lineRunMapDetail);
        this.lineRunMapDetailInfo.formatStartTimeAm = this.stringToTime(this.lineRunMapDetailInfo.startTimeAm, 1);
        this.lineRunMapDetailInfo.formatStartTimePm = this.stringToTime(this.lineRunMapDetailInfo.startTimePm, 1);
        this.lineRunMapDetailInfo.formatEndTimeAm = this.stringToTime(this.lineRunMapDetailInfo.endTimeAm, 1);
        this.lineRunMapDetailInfo.formatEndTimePm = this.stringToTime(this.lineRunMapDetailInfo.endTimePm, 1);
        this.refreshData();
    }

    refreshData() {
        this.devKey = 0;
        this.lineRunMapDetailInfo.detailList = [...this.lineRunMapDetailInfo.detailList];
        this.lineRunMapDetailInfo.detailList.forEach((devInfo) => {
            devInfo.key = this.devKey;
            this.devKey += 1;
            this.tempEditObject[devInfo.key] = {};
            devInfo.formatArrivalTime = this.stringToTime(devInfo.arrivalTime, 2);
        });
        console.log(this.tempEditObject)
    }

    edit(data) {
        this.tempEditObject[data.key] = {...data};
        this.editRow = data.key;
        console.log(data, this.tempEditObject)
        if (this.tempEditObject[data.key].clrTimeInterval == 1) {
            this.disabledHours = this.disabledHoursAM;
        } else {
            this.disabledHours = this.disabledHoursPM;
        }
    }

    save(data) {
        Object.assign(data, this.tempEditObject[data.key]);
        data.arrivalTime = this.formatDay(this.tempEditObject[data.key].formatArrivalTime);
        this.editRow = null;
    }

    cancel(data) {
        this.tempEditObject[data.key] = {};
        this.editRow = null;
    }

    delete(key) {
        this.lineRunMapDetailInfo.detailList.splice(key, 1);
        this.refreshData();
    }

    addDev() {
        const devInfo = {};
        devInfo['arrivalTime'] = this.formatDay(new Date());
        this.lineRunMapDetailInfo.detailList.push(devInfo);
        this.editRow = this.lineRunMapDetailInfo.detailList.length - 1;
        this.refreshData();
    }

    submit() {
        this.lineRunMapDetailInfo.runDate = this.runDate;
        const params = Object.assign({}, this.lineRunMapDetailInfo,
            {
                startTimeAm: this.formatTime(this.lineRunMapDetailInfo.formatStartTimeAm),
                startTimePm: this.formatTime(this.lineRunMapDetailInfo.formatStartTimePm),
                endTimeAm: this.formatTime(this.lineRunMapDetailInfo.formatEndTimeAm),
                endTimePm: this.formatTime(this.lineRunMapDetailInfo.formatEndTimePm),
            });
        console.log(this.lineRunMapDetailInfo);
        this.service.modLineRunMap(params).subscribe(_data => {
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

    stringToTime(timeString, type) { // type=1： 格式化为HH:MM; 2:格式化为HH:MM:SS
        const date = new Date();
        if (!timeString) {
            return;
        }
        date.setHours(timeString.substring(0, timeString.indexOf(':')));
        if (type == 1) {
            date.setMinutes(timeString.substring(timeString.indexOf(':') + 1));
        }
        if (type == 2) {
            date.setMinutes(timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':')));
            date.setSeconds(timeString.substring(timeString.lastIndexOf(':') + 1));
        }
        return date;
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

    formatTime(time) {
        if (!time) return;
        return this.formatNumber(time.getHours()) + ':' + this.formatNumber(time.getMinutes());
    }

    newArray = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledHoursPM = () => {
        const hours = this.newArray(0, 12);
        return hours;
    }

    disabledHoursAM = () => {
        const hours = this.newArray(12, 24);
        return hours;
    }

    selectHours(type, key) {
        if (type === 1) {
            this.disabledHours = this.disabledHoursAM;
        } else {
            this.disabledHours = this.disabledHoursPM;
        }
    }

}

