import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { AdjustGroupComponent } from './adjust-group/adjust-group.component';
import { GroupRouterComponent } from './group-router/group-router.component';
import { AdjustRouterComponent } from './adjust-router/adjust-router.component';
import { GroupMapComponent } from './group-map/group-map.component';
import { AddnotesPlanService } from '../../addnotes-plan.service';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { EventBus } from '@core/utils.service';
import { AppService } from 'app/app.service';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
    selector: 'fix-group-tsp',
    templateUrl: 'fix-group-tsp.html'
})

export class FixGroupTspComponent implements OnInit {

    canAudit = false;
    addnotesPlanNo: string;
    dataSet: any = [{}, {}];
    devsNotGroup = [];
    groupList = [];
    data = {};
    loading = true;
    loading_operating = false;
    groupNum = 1;
    maxOutLineGroupNum = 100;

    constructor(private modal: NzModalService,
        private modalSubject: NzModalRef,
        private eventBus: EventBus,
        private message: NzMessageService,
        private appservice: AppService,
        private service: AddnotesPlanService) {
    }

    ngOnInit() { }

    @Input()
    set planNo(planNo: string) {
        this.addnotesPlanNo = planNo;
        this.getGroupQry();
    }

        //
    getGroupQry() {
        const params = { addnotesPlanNo: this.addnotesPlanNo };

        this.service.qryTsp(this.addnotesPlanNo).subscribe(_data => {
            this.loading = false;
            this.data = _data.element;

            this.groupList = _data.element.group;
            this.groupList.forEach(data => {
                if (data.lineName == null) {
                    data.lineName = '临时线路' + data.groupNo.substring(data.groupNo.length - 2);
                }
                data.planDistance = (data.planDistance /= 1000).toFixed(1);
            });
            this.devsNotGroup = _data.element.netPointsNotGroup || [];
            // this.maxOutLineGroupNum = this.devsNotGroup.length;

            if (_data.element.group.length > 0) {
                this.canAudit = true;
            } else {
                this.group(false);
            }

        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    /**
     * @param {boolean} type false:线路内分组，false:线路外分组
     */
    group(type: boolean) {
        this.loading_operating = true;
        const params: any = {
            addnotesPlanNo: this.addnotesPlanNo,
            tspFlag: 1,
            tactic: 11,
            earliestStartTime: '08:00:00',
            lastestArrivalTime: '18:00:00',
            groupType: SYS_CONS.ADDNOTE_MODE.FIX
        };
        if (type) {
            params.groupNum = this.groupNum;
        }
        this.service.groupTsp(params).subscribe(_data => {
            this.loading_operating = false;
            this.canAudit = true;
            // this.groupList = _data.element.group;
            // this.groupList.forEach(data => {
            //     if (data.lineName == null) {
            //         data.lineName = '临时线路' + data.groupNo.substring(data.groupNo.length - 2);
            //     }
            //     data.planDistance = (data.planDistance /= 1000).toFixed(1);
            // });
            // this.devsNotGroup = _data.element.netPointsNotGroup;
            // this.maxOutLineGroupNum = this.devsNotGroup.length;
            this.message.success(_data.retMsg);
            this.getGroupQry();
        }, (error) => {
            this.loading_operating = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }

        });
    }

    getNetpointsWithDevsOfGroup(data) {
        this.service.getNetpointsWithDevsOfGroup({
            addnotesPlanNo: this.addnotesPlanNo,
            groupNo: data.groupNo
        }).subscribe(_data => {
            data.retList = _data.retList;

        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    submitAudit() {
        this.loading_operating = true;
        this.service.submitAudit({addnotesPlanNo: this.addnotesPlanNo}).subscribe(
            data => {
                this.message.success(data.retMsg);
                this.modalSubject.triggerCancel();
                this.eventBus.events.next();
            },
            error => {
                this.loading_operating = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }

    showTanle(data) {
        if (data.flag === true) {
            data.flag = false;
        } else {
            data.flag = true;
            this.getNetpointsWithDevsOfGroup(data);
        }
    }

    openAdjustGroup(groupNo) {
        const AdjustGroupModal = this.modal.create({
            nzTitle: '调整分组',
            nzWidth: '95%',
            nzContent: AdjustGroupComponent,
            nzFooter: null,
            nzZIndex: 200,
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo,
                groupNo: groupNo
            },
            nzOnOk: () => {
                this.getGroupQry();
            }
        });
    }

    openGroupRouter() {
        const GroupRouterModal = this.modal.create({
            nzTitle: '加钞计划[' + this.addnotesPlanNo + ']的分组路线图',
            nzWidth: '95%',
            nzContent: GroupRouterComponent,
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo,
                clrCenterNo: this.data['clrCenterNo'],
                groups: _.map(this.groupList, 'groupNo')
            },
            nzFooter: null,
            nzZIndex: 200,
            nzOnOk: () => { },
            nzOnCancel: () => { }
        });
    }

    openAdjustRouter(groupNo) {
        const AdjustRouterModal = this.modal.create({
            nzTitle: '调整线路',
            nzWidth: '95%',
            nzContent: AdjustRouterComponent,
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo,
                groupNo: groupNo
            },
            nzFooter: null,
            nzZIndex: 200,
            nzOnOk: () => {
                this.getGroupQry();
            }
        });
    }

    openGroupMap(groupNo) {
        const GroupMapModal = this.modal.create({
            nzTitle: '分组地图',
            nzWidth: '95%',
            nzContent: GroupMapComponent,
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo,
                groupNo: groupNo
            },
            nzFooter: null,
            nzZIndex: 200
        });
    }

}
