import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { GroupMapComponent } from './../../addnotes-plan/add/auto-group-tsp/group-map/group-map.component';
import { AppService } from 'app/app.service';
import { AddnotesTaskService } from '../addnotes-task.service';
import { AddnotesTaskAssignToComponent } from '../addnotes-task-assignTo/addnotes-task-assignTo.component';

@Component({
    templateUrl: 'addnotes-task-process.html'
})

export class AddnotesTaskProcessComponent implements OnInit {
    data;
    detailList = [];
    currentProgress = 0;

    constructor(private modal: NzModalService, private appService: AppService, private service: AddnotesTaskService) { }

    ngOnInit() {
        this.detailList = [
            {
                name: '任务编号',
                value: this.data.taskNo
            },
            {
                name: '所属金库',
                value: this.data.clrCenterName
            },
            {
                name: '加钞日期',
                value: this.data.planFinishDate
            },
            {
                name: '加钞线路',
                value: this.data.lineName

            },
        ];

        switch (this.data.status) {
            case 201:
                if (!!this.data.opNo1 || !!this.data.opNo2) {
                    this.currentProgress = 1;
                } else {
                    this.currentProgress = 0;
                }
                break;
            case 501:
                this.currentProgress = 2;
                break;
            case 401:
                this.currentProgress = 3;
                break;
            case 301:
                this.currentProgress = 4;
                break;
            case 308:
                this.currentProgress = 5;
                break;
            case 306:
                this.currentProgress = 6;
                break;
            case 304:
                this.currentProgress = 7;
                break;
            case 402:
                this.currentProgress = 8;
                break;
            case 502:
                this.currentProgress = 9;
                break;
            case 205:
                this.currentProgress = 10;
                break;
            default:
                if (!!this.data.opNo1 || !!this.data.opNo2) {
                    this.currentProgress = 1;
                } else {
                    this.currentProgress = 0;
                }
        }
    }

    mapRouter() {
        const GroupMapModal = this.modal.create({
            nzTitle: `加钞线路图[${this.data.taskNo}]`,
            nzWidth: '95%',
            nzContent: GroupMapComponent,
            nzComponentParams: {
                addnotesPlanNo: this.data.addnotesPlanNo,
                groupNo: `${this.data.lineNo}`
            },
            nzZIndex: 999,
            nzFooter: null
        });
    }

    openAssignTo() {
        this.modal.create({
            nzTitle: '分配人员',
            nzWidth: '50%',
            nzFooter: null,
            nzContent: AddnotesTaskAssignToComponent,
            nzComponentParams: {
                dispatch: this.data
            },
            nzOnOk: () => this.updateTask(1)
        });
    }

    updateTask(progress) {
        this.service.qryDetail(this.data.taskNo).subscribe(
            result => {
                this.data.opNo1 = result.retList[0].opNo1;
                this.data.opNo2 = result.retList[0].opNo2;
                this.data.opName1 = result.retList[0].opName1;
                this.data.opName2 = result.retList[0].opName2;
                this.currentProgress = progress;
            }
        );

    }

}

