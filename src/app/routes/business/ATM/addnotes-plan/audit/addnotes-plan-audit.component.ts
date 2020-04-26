import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AddnotesPlanService } from './../addnotes-plan.service';
import { DetailComponent } from './../detail/detail.component';
import { AddnotesPlanAuditModal } from './audit-modal/addnotes-plan-audit.modal';
import * as _ from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../../../models/constant';
import { Page } from '../../../../../models/page';
import { AppService } from 'app/app.service';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
    templateUrl: './addnotes-plan-audit.html',
})
export class AddnotesPlanAuditComponent implements OnInit {
    loading = true;
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;
    formModel: {
      dateRange?: Array<Date>,
        clrCenterNo?: string,
        status?: string
    } = {};

  today = new Date();
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < -90;
  };
    searchModel = (function (formModel) {
        return {
            get planStartDate() {
              return formModel.dateRange ? formModel.dateRange[0].format('YYYY-MM-DD') : '';
            },
            get planEndDate() {
              return formModel.dateRange ? formModel.dateRange[1].format('YYYY-MM-DD') : '';
            },
            get clrCenterNo() {
                return formModel.clrCenterNo || null;
            },
            get status() {
                return typeof formModel.status === 'number' ? formModel.status : null;
            }
        };
    })(this.formModel);
    dataSet = [];
    page = new Page();

    states = SYS_CONS.STATE.ADDNOTE_PLAN;

    constructor(
        private modal: NzModalService,
        private message: NzMessageService,
        private service: AddnotesPlanService,
        private appService: AppService
        ) { }

    ngOnInit() {
        this.reset();
    }

    openDetail(addnotesPlanNo) {
        const detailModal = this.modal.create({
            nzTitle: '加钞计划详情',
            nzContent: DetailComponent,
            nzWidth: '95%',
            nzComponentParams: {
                addnotesPlanNo: addnotesPlanNo
            },
            nzFooter: null,
        });
    }

    refreshData(reset = false) {
        this.loading = true;
        if (reset) {
            this.page.curPage = 1;
        }
        const params = _.extend({}, this.page, this.searchModel);
        this.service.page(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.loading = false;
                this.dataSet.forEach(data => {
                    if (data.isUrgency === 1) {
                        data.background = '#F08080';
                    }
                });
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    reset() {
      Object.assign(this.formModel, {
            dateRange: [new Date(), new Date()],
            clrCenterNo: null,
            status: this.states[4].value
        });
        this.refreshData(true);
    }

    audit(addnotesPlan) {
        const auditModal = this.modal.create({
            nzTitle: '加钞计划审批',
            nzContent: AddnotesPlanAuditModal,
            nzWidth: '95%',
            nzComponentParams: {
                addnotesPlanNo: addnotesPlan.addnotesPlanNo
            },
            nzClassName: 'zj-modal',
            nzFooter: null,
            nzOnOk: () => {
                this.refreshData();
            }
        });
    }
}
