import {Component, OnInit} from '@angular/core';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import {NzModalService, NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

@Component({
    templateUrl: 'adjust-router.html',
})

export class AdjustRouterComponent implements OnInit {
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
        console.log(params);

        this.service.qryByNo(params).subscribe(_data => {
            this.data['planNetPntCnt'] = _data.element['planNetPntCnt'];
            this.data['planDevCnt'] = _data.element['planDevCnt'];
            this.data['planDistance'] = (_data.element.planDistance /= 1000).toFixed(1);
            this.data['planTimeCost'] = _data.element['planTimeCost'];
            this.groupList = _data.element.netPointsGroup;
            this.groupList.forEach(d => {
                d['allKeyEventDetail'] = this.allKeyEventDetailOfDevNo(d['devs']);
                d['index'] = this.groupList.indexOf(d);
            });
            console.log(this.groupList);
            console.log(_data.element);
        });
    }


    modify() {
        const params: any = {};
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['groupNo'] = this.groupNo;
        params['netPointsGroup'] = this.groupList;
        console.log(params);

        this.service.groupModTsp(params).subscribe(_data => {
            console.log(_data);
            this.message.success(_data.retMsg);
            this.subject.triggerOk();
        }, (error) => {
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    // openAdd() {
    //     this.subject.destroy();
    //     this.modal.open({
    //         title: '分组',
    //         width: 1650,
    //         content: AutoGroupTspComponent,
    //         componentParams: {
    //             addnotesPlanNo: this.addnotesPlanNo
    //         },
    //         footer: false,
    //
    //     });
    // }

    allKeyEventDetail(dataList) {
        let allString = '';
        dataList.forEach(data => {
            allString += '[' + data.no + ']' + data.keyEventDetail;
        });
        return allString;
    }

    allKeyEventDetailOfDevNo(dataList) {
        let allString = '';
        dataList.forEach(data => {
            allString += '[' + data.devNo + ']' + data.keyEventDetail;
        });
        return allString;
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
