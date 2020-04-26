import {Component, OnInit} from '@angular/core';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import {NzModalService, NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

@Component({
    templateUrl: 'adjust-router.html',
})

export class AdjustRouterComponent implements OnInit {
    loading = false;
    dataSet: any = [{}];
    addnotesPlanNo: string;
    groupNo: string;
    netPointsNotGroup = [];
    groupList = [];
    data = {};

    constructor(private modal: NzModalService,
                private message: NzMessageService,
                private subject: NzModalRef,
                private service: AddnotesPlanService) {
    }

    ngOnInit() {
        this.getGroupQry();
    }

    getGroupQry() {
        const params: any = {};
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['groupNo'] = this.groupNo;

        this.service.qryByNo(params).subscribe(_data => {
            this.data['planNetPntCnt'] = _data.element['planNetPntCnt'];
            this.data['planDevCnt'] = _data.element['planDevCnt'];
            this.data['planDistance'] = (_data.element.planDistance /= 1000).toFixed(1);
            this.data['planTimeCost'] = _data.element['planTimeCost'];
            this.groupList = _data.element.netPointsGroup;
            this.groupList.forEach(d => {
                d['index'] = this.groupList.indexOf(d);
            });
        });
    }

    modify() {
        const params: any = {};
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['groupNo'] = this.groupNo;
        this.groupList.forEach(data => {
            data.devNo = data.no;
        });
        params['netPointsGroup'] = this.groupList;
        this.loading = false;
        this.service.groupModTsp(params).subscribe(_data => {
            this.loading = false;
            this.message.success(_data.retMsg);
            this.subject.triggerOk();
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    //  数组减缓元素
    swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    }

    // 上移
    upRecord(arr, index) {
        if (index == 0) {
            return;
        }
        this.swapItems(arr, index - 1, index);
        this.groupList.forEach(d => {
            d['index'] = this.groupList.indexOf(d);
            d['sortNo'] = d['index'] + 1;
        });
    }

    // 下移
    downRecord(arr, index) {
        if (index == arr.length - 1) {
            console.log('返回')
            return;
        }
        this.swapItems(arr, index, index + 1);
        this.groupList.forEach(d => {
            d['index'] = this.groupList.indexOf(d);
            d['sortNo'] = d['index'] + 1;
        });
    }

}
