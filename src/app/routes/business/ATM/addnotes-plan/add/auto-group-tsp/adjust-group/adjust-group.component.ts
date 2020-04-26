import {Component, OnInit} from '@angular/core';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import {NzModalService, NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'adjustGroup',
    templateUrl: 'adjust-group.html',
})
export class AdjustGroupComponent implements OnInit {

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
            // this.data['planDistance'] = _data['planDistance'];
            this.data['planDistance'] = (_data.element.planDistance /= 1000).toFixed(1);
            this.data['planTimeCost'] = _data.element['planTimeCost'];
            this.netPointsNotGroup = _data.element.netPointsNotGroup;
            this.groupList = _data.element.netPointsGroup;
            this.groupList.forEach(d => {
                d['allKeyEventDetail'] = this.allKeyEventDetailOfDevNo(d['devs']);
                d['checked'] = true;
            });
            console.log(this.groupList);
            console.log(_data.element);
        });
    }

    modify() {
        const netPointsGroup = [];
        const netPointsNotGroup = [];

        this.groupList.forEach(data => {
            if (!data.checked) {
                netPointsNotGroup.push(data.orgNo);
            } else {
                netPointsGroup.push(data.orgNo);
            }
        });

        this.netPointsNotGroup.forEach(data => {
            if (!data.checked) {
                netPointsNotGroup.push(data.orgNo);
            } else {
                netPointsGroup.push(data.orgNo);
            }
        });

        const params: any = {};
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['groupNo'] = this.groupNo;
        params['netPointsGroup'] = netPointsGroup;
        params['netPointsNotGroup'] = netPointsNotGroup;
        console.log(params);

        this.service.groupMod(params).subscribe(_data => {
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
}
