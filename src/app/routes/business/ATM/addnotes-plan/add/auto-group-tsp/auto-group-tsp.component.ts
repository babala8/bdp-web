import { Component, OnInit, Input } from '@angular/core';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { AddnotesPlanService } from '../../addnotes-plan.service';
import { HttpResponse } from '@angular/common/http';

import { AdjustRouterComponent } from './../fix-group-tsp/adjust-router/adjust-router.component';
import { GroupMapComponent } from './../fix-group-tsp/group-map/group-map.component';
import { GroupRouterComponent } from './../fix-group-tsp/group-router/group-router.component';
import { AdjustGroupComponent } from './../fix-group-tsp/adjust-group/adjust-group.component';

import * as _ from 'lodash';
import * as moment from 'moment';
import { EventBus } from '@core/utils.service';
import { AppService } from 'app/app.service';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
    selector: 'auto-group-tsp',
    templateUrl: 'auto-group-tsp.html',
})

export class AutoGroupTspComponent implements OnInit {

    addnotesPlanNo: string;
    dataSet: any = [{}, {}];
    formModel = {};
    devsNotGroup = [];
    groupList = [];
    data;
    loading;
    loading_operating;
    canAudit = false;
    maxGroup = 1;
    minNetpointNumOfGroup = 1;

    constructor(private modal: NzModalService,
        private modalSubject: NzModalRef,
        private message: NzMessageService,
        private appservice: AppService,
        private service: AddnotesPlanService,
        private eventBus: EventBus) {
    }

    ngOnInit() {
        this.formModel['earliestStartTime'] = new Date();
        this.formModel['earliestStartTime'].setHours(8, 0);
        this.formModel['lastestArrivalTime'] = new Date();
        this.formModel['lastestArrivalTime'].setHours(18, 0);
    }

    @Input()
    set planNo(planNo: string) {
        this.addnotesPlanNo = planNo;
        this.getGroupQry();
    }

    getGroupQry() {
        this.loading = true;

        this.service.qryTsp(this.addnotesPlanNo).subscribe(
            result => {
                const _data = result.element;
                this.loading = false;
                this.data = _data;
                this.groupList = _data.group;
                if (this.groupList.length > 0) {
                    this.canAudit = true;
                }
                this.groupList.forEach(data => {
                    data.planDistance = (data.planDistance /= 1000).toFixed(1);
                });
                this.devsNotGroup = _data.netPointsNotGroup || [];
                this.getMaxGroup();
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    group() {
        if (this.formModel['earliestStartTime'] >= this.formModel['lastestArrivalTime']) {
            this.message.warning('返回时间应该大于出发时间');
            return;
        }
        if (!this.getMaxNetpointNumOfGroup()) {
            return;
        }
        this.loading_operating = true;
        const params: any = [];
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['tspFlag'] = 1;
        params['tactic'] = 11;
        params['groupNum'] = parseInt(this.formModel['groupNum']);
        params['maxNetpointNumOfGroup'] = this.formModel['maxDevNumOfGroup'];
        params['earliestStartTime'] = moment(this.formModel['earliestStartTime']).format('HH:mm:ss');
        params['lastestArrivalTime'] = moment(this.formModel['lastestArrivalTime']).format('HH:mm:ss');
        params['groupType'] = SYS_CONS.ADDNOTE_MODE.DYNAMIC;

        console.log('!!!!!!!!!!!', params)
        this.service.groupTsp(params).subscribe(data => {
            this.loading_operating = false;
            this.canAudit = true;
            // this.groupList = data.group;
            // this.groupList.forEach(data => {
            //     data.planDistance = (data.planDistance /= 1000).toFixed(1);
            // });
            // this.devsNotGroup = data.devsNotGroup;
            this.loading = false;
            this.message.success(data.retMsg);
            this.getGroupQry();
        }, (error) => {
            this.loading_operating = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    getNetpointsWithDevsOfGroup(data) {
        const params: any = {};
        params['addnotesPlanNo'] = this.addnotesPlanNo;
        params['groupNo'] = data.groupNo;

        this.service.getNetpointsWithDevsOfGroup(params).subscribe(_data => {
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
        this.service.submitAudit({ addnotesPlanNo: this.addnotesPlanNo }).subscribe(
            data => {
                this.message.success(data.retMsg);
                this.modalSubject.destroy();
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

    // 得到最大分组数
    getMaxGroup() {
        this.maxGroup = this.data['planDevCount'] > this.data['cashTruckNum'] ? this.data['cashTruckNum'] : this.data['planDevCount'];
        if (this.maxGroup === 1) {
            this.formModel['groupNum'] = 1;
            this.getMaxNetpointNumOfGroup();
        }
    }

    // 根据分组数，得到分组下最大可配置网点数
    getMaxNetpointNumOfGroup() {
        if (!this.formModel['groupNum'])
            return true;
        this.formModel['maxDevNumOfGroup'] = this.data['planDevCount'] - this.formModel['groupNum'] + 1;
        if (Number(this.formModel['groupNum']) <= 0 || Number(this.formModel['groupNum']) > this.maxGroup) {
            // this.formModel['groupNum'] = 1;
            this.data['maxDevNumOfGroup'] = this.data['planDevCount'] - this.formModel['groupNum'] + 1;
            this.minNetpointNumOfGroup = this.data['planDevCount'] / this.formModel['groupNum'];
            this.message.warning('分组数不能超过限定范围');
            this.getmaxNetpointNumOfGroup();
            return false;
        }
        this.data['maxDevNumOfGroup'] = this.data['planDevCount'] - this.formModel['groupNum'] + 1;
        this.minNetpointNumOfGroup = Math.ceil(this.data['planDevCount'] / this.formModel['groupNum']);
        if (this.data['maxDevNumOfGroup'] == this.minNetpointNumOfGroup) {
            this.formModel['maxDevNumOfGroup'] = this.minNetpointNumOfGroup;
        }
        return this.getmaxNetpointNumOfGroup();
    }

    //  判定分组最大网点数是否符合限定范围
    getmaxNetpointNumOfGroup() {
        if (this.formModel['maxDevNumOfGroup'] > this.data['maxDevNumOfGroup'] || this.formModel['maxDevNumOfGroup'] < this.minNetpointNumOfGroup) {
            this.message.warning('分组下最大网点数不能超过限定范围');
            // this.formModel['maxDevNumOfGroup'] = this.data['maxDevNumOfGroup'];
            return false;
        }
        return true;
    }

    showTanle(data) {
        if (data.flag == true) {
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
            nzZIndex: 200
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
