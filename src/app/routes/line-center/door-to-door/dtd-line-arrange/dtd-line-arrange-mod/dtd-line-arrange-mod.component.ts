import {Component, OnInit} from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { DtdLineArrangeService } from '../dtd-line-arrange.service';

@Component({
    templateUrl: './dtd-line-arrange-mod.html'
})
export class DtdLineArrangeModComponent implements OnInit {
    dtdDetail;
    isEdit;
    loading = false;
    detailList=[];
    dataList=[];
    editRow = null;
    tempEditObject =[];
    dtdKey;

    constructor(
                private service: DtdLineArrangeService,
                private nzModalRef: NzModalRef,
                private message: NzMessageService) {
    }

    ngOnInit() {
        this.detailList = [
            {
                name: '线路名称',
                value: this.dtdDetail.lineName || ''
            },
            {
                name: '排班编号',
                value: this.dtdDetail.lineWorkId || ''
            },
            {
                name: '日期',
                value: this.dtdDetail.theYearMonth + '-' +  this.dtdDetail.theDay
            }
        ]
        this.dataList = _.cloneDeep(this.dtdDetail.detailList)
        this.refreshData();
    }

    refreshData() {
        this.dataList = [...this.dataList];
        this.dtdKey = 0;
        this.dataList.forEach((data) => {
            data.key = this.dtdKey;
            this.dtdKey += 1;
            this.tempEditObject[data.key] = {};
        });
        console.log(this.dataList)
    }

    addNet(){
        const newInfo ={
        }
        this.dataList.push(newInfo);
        this.editRow = this.dataList.length - 1;
        this.refreshData();
    }

    edit(data) {
        this.tempEditObject[data.key] = { ...data };
        this.tempEditObject[data.key].arrivalTime = this.stringToTime(this.tempEditObject[data.key].arrivalTime, 2);
        console.log(this.tempEditObject);
        this.editRow = data.key;
    }

    save(data) {
        this.tempEditObject[data.key].arrivalTime = this.formatTime(this.tempEditObject[data.key].arrivalTime)
        console.log(this.tempEditObject[data.key])
        Object.assign(data, this.tempEditObject[data.key]);
        this.editRow = null;
    }

    cancel(data) {
        this.tempEditObject[data.key] = {};
        this.editRow = null;
    }

    delete(key) {
        this.dataList.splice(key, 1);
        this.refreshData();
    }

    submit(){
        this.dtdDetail.detailList = this.dataList;
        const params = Object.assign({}, this.dtdDetail);
        console.log(this.dtdDetail);
        this.service.modLineRunMap(params).subscribe(_data => {
            this.loading = false;
            this.nzModalRef.triggerOk();
            this.message.success(`修改上门客户信息成功！`);
        }, (error) => {
            this.loading = false;
            console.log(error);
        });
    }

    stringToTime(timeString, type) {
        // type=1： 格式化为HH:MM; 2:格式化为HH:MM:SS
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

    formatTime(time) {
        if (!time) return;
        return this.formatNumber(time.getHours()) + ':' + this.formatNumber(time.getMinutes()) + ':' + this.formatNumber(time.getSeconds());
    }

    formatNumber(num) {
        return ('' + num).length < 2 ? '0' + num : '' + num;
    }
}
