import {Component, OnInit} from '@angular/core';
import {AddnotesPlanService} from '../../../addnotes-plan.service';
import {NzModalService, NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';

@Component({
    templateUrl: 'adjust-group.html',
})

export class AdjustGroupComponent implements OnInit {

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
        const params: any = {
            addnotesPlanNo: this.addnotesPlanNo,
            groupNo: this.groupNo
        };

        this.service.qryByNo(params).subscribe(_data => {
            this.data['planNetPntCnt'] = _data.element['planNetPntCnt'];
            this.data['planDevCnt'] = _data.element['planDevCnt'];
            this.data['planDistance'] = (_data.element.planDistance /= 1000).toFixed(1);
            this.data['planTimeCost'] = _data.element['planTimeCost'];
            this.netPointsNotGroup = _data.element.netPointsNotGroup;
            this.groupList = _data.element.netPointsGroup;
            this.groupList.forEach(d => {
                d['checked'] = true;
            });
        });
    }

    modify() {
        const netPointsGroup = [];
        const netPointsNotGroup = [];

        this.groupList.forEach(data => {
            if (!data.checked) {
                netPointsNotGroup.push(data.devNo);
            } else {
                netPointsGroup.push(data.devNo);
            }
        });

        this.netPointsNotGroup.forEach(data => {
            if (!data.checked) {
                netPointsNotGroup.push(data.devNo);
            } else {
                netPointsGroup.push(data.devNo);
            }
        });

        const params: any = {
            addnotesPlanNo: this.addnotesPlanNo,
            groupNo: this.groupNo,
            netPointsGroup: netPointsGroup,
            netPointsNotGroup: netPointsNotGroup
        };
        this.loading = true;
        this.service.groupMod(params).subscribe(_data => {
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

}
