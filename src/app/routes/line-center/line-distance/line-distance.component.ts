import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { SessionService } from '@core/session.service';
import { Page } from '../../../models/page';
import { HttpResponse } from '@angular/common/http';
import { AppService } from '../../../app.service';
import { SYS_CONS } from '../../../models/constant';
import { LineDistanceService } from './line-distance.service';
import { LineDistanceLinkComponent } from './line-distance-link/line-distance-link.component';

@Component({
    templateUrl: 'line-distance.html',
})

export class LineDistanceComponent implements OnInit {

    formModel = {};
    clrCenterList = [];
    loading = true;
    dataSet = [];
    page = new Page();
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;
    types = [
        { label: '所有类型', value: -1 },
        { label: '设备到设备', value: 0 },
        { label: '金库到设备', value: 1 },
        { label: '设备到金库', value: 2 },
        { label: '网点到网点', value: 3 },
        { label: '金库到网点', value: 4 },
        { label: '网点到金库', value: 5 },

    ];

    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private session: SessionService,
        private appService: AppService,
        private service: LineDistanceService
    ) { }


    ngOnInit() {
        this.getClrCenterList();
    }

    refreshData(reset = false) {
        this.loading = true;
        if (reset) {
            this.page.curPage = 1;
        }
        const params = _.extend(this.page);
        params['tactic'] = 11;
        params['type'] = this.formModel['type'];
        params['clrCenterNo'] = this.formModel['clrCenterNo'];
        params['endPointNo'] = this.formModel['endPointNo'];
        params['startPointNo'] = this.formModel['startPointNo'];
        this.service.page(params)
            .subscribe(
                _data => {
                    this.dataSet = _data['retList'];
                    this.page.totalRow = _data['totalRow'];
                    this.page.totalPage = _data['totalPage'];
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                    if (error instanceof HttpResponse) {
                        this.message.error(error.body.retMsg);
                    }
                });

    }

    getClrCenterList() {
        const params = { orgNo: this.session.orgNo };
        this.service.getClrCenterList(params)
            .subscribe(_data => {
                this.clrCenterList = _data.retList;
                this.reset();
            }, (error) => {
                this.loading = false;
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    handleSelect(type) {
      let title = '';
      if(type == 1) {
        title = '设备关联'
      }else {
        title = '网点关联'
      }
        const modal = this.modal.create({
            nzTitle: title,
            nzWidth: '95%',
            nzContent: LineDistanceLinkComponent,
            nzFooter: null,
            nzComponentParams: {
            dataType: type
          },
            nzOnOk: () => {
                // 【成功时】
                this.refreshData(true);
            },
            nzOnCancel: () => {
                // 【取消时】，刷新数据，并回到第一页
            },
        });
    }

    reset() {
        this.formModel['startPointNo'] = '';
        this.formModel['endPointNo'] = '';
        this.formModel['type'] = -1;
        this.formModel['clrCenterNo'] = this.clrCenterList[0].clrCenterNo;
        this.refreshData(true);
    }


}
