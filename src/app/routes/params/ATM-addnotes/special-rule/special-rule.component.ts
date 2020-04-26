import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {SpecialRuleService} from './special-rule.service';
import {HttpResponse} from '@angular/common/http';
import * as add_days from 'date-fns/add_days';
import { SYS_CONS } from '../../../../models/constant';
import { Page } from '../../../../models/page';
import { AppService } from 'app/app.service';
import { SpecialRuleModComponent } from './special-rule-mod/special-rule-mod.component';
import { SpecialRuleAddComponent } from './special-rule-add/special-rule-add.component';
import { SpecialRuleDetailComponent } from './special-rule-detail/special-rule-detail.component';

@Component({
    templateUrl: './special-rule.html',
})

export class SpecialRuleComponent implements OnInit {

    formModel = {};
    loading;
    dataSet = [];
    startTime;
    endTime;
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;
    page = new Page();

    constructor(private modal: NzModalService,
                private message: NzMessageService,
                private appservice: AppService,
                private service: SpecialRuleService) {
    }

    ngOnInit() {
        this.reset();
        this.refreshData(true);
    }

    refreshData(reset = false) {
        this.loading = true;
        if (reset) {
            this.page.curPage = 1;
        }
        const params = _.extend(this.formModel, this.page, {
            startDate : this.formattingData(this.formModel['startDate']),
            endDate : this.formattingData(this.formModel['endDate'])
        });

        this.service.page(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.page.totalPage = _data['totalPage'];
                this.loading = false;
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openAdd() {
        const  AddModal = this.modal.create({
            nzTitle: '添加特殊规则',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialRuleAddComponent,
            nzOnOk: () => {
                this.refreshData(true);
            }
        });
    }

    openModify(ruleId) {
        const  ModifyModal = this.modal.create({
            nzTitle: '修改特殊规则',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialRuleModComponent,
            nzComponentParams: {
                ruleId: ruleId
            },
            nzOnOk: () => {
                this.refreshData();
            }
        });
    }

    openDetail(ruleId) {
        const  DetailModal = this.modal.create({
            nzTitle: '特殊加钞规则详情',
            nzWidth: 900,
            nzFooter: null,
            nzContent: SpecialRuleDetailComponent,
            nzComponentParams: {
                ruleId: ruleId
            },
        });
    }

    delete(ruleId) {
        this.service.detele( {ruleId: ruleId})
            .subscribe(_data => {
                this.message.success('删除成功！');
                this.refreshData(true);
            }, error => {
                if(error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    search() {
        this.refreshData(true);
    }

    formattingData(data) {
        if (typeof  data !== 'string' && data) {
            const year = data.getFullYear() + '-';
            const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) + '-' : (data.getMonth() + 1) + '-';
            const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();

            data = year + month + day;
        }
        return data;
    }

    reset() {
        this.formModel = {
            startDate: null,
            endDate: null
        };
        this.refreshData();
    }

    _startValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['endDate'] = null;
        }
    }

    _endValueChange = () => {
        if (this.formModel['startDate'] > this.formModel['endDate']) {
            this.formModel['startDate'] = null;
        }
    }

}
