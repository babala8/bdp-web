import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core';
import { AppService } from 'app/app.service';
import { Page } from 'app/models/page';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as _ from 'lodash';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../models/constant';
import { AddnotesPlanSubmitComponent } from './add/addnotes-plan-submit/addnotes-plan-submit.component';
import { StepFormComponent } from './add/step-form/step-form.component';
import { AddCrashPlanComponent } from './addCrashPlan/add-crash-plan.component';
import { ReviseCrashPlanComponent } from './addCrashPlan/component/reviseCrashPlan.component';
import { AddnotesPlanService } from './addnotes-plan.service';
import { DetailComponent } from './detail/detail.component';

@Component({
    templateUrl: './addnotes-plan.html',
})
export class AddnotesPlanComponent implements OnInit {
    loading = true;
    expandForm;
    formModel: {
        dateRange?: Array<Date>,
        clrCenterNo?: string,
        status?: string,
        lineNo?: string,
        urgencyFlag?: number
    } = {};
    PAGESIZE_SELECTOR = SYS_CONS.PAGESIZE_SELECTOR;

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
            },
            get lineNo() {
                return formModel.lineNo || null;
            },
            get urgencyFlag() {
                return formModel.urgencyFlag || null;
            }
        };
    })(this.formModel);
    dataSet = [];
    page = new Page();

    urgencyFlags = [{'no': '0', 'name': '非紧急'},
        {'no': '1', 'name': '紧急'}];

    states = SYS_CONS.STATE.ADDNOTE_PLAN;

    clrCenterList = [];

    constructor(private modal: NzModalService,
                private message: NzMessageService,
                private appService: AppService,
                private session: SessionService,
                private service: AddnotesPlanService) {
    }

    ngOnInit() {
            this.reset();
            this.refreshData(true);
    }

    openAdd() {
        const addModal = this.modal.create({
            nzTitle: '添加加钞计划',
            nzContent: AddnotesPlanSubmitComponent,
            nzWidth: 800,
            nzFooter: null,
            nzOnOk: result => {
              this.openStepForm(result.addnotesPlanNo);
            },
          nzOnCancel: () => {}
        });
    }

  openStepForm(addnotesPlanNo) {
    this.service.step = 0;
    const StepFormModal = this.modal.create({
      nzWidth: '95%',
      nzWrapClassName: 'no-padding-modal',
      nzContent: StepFormComponent,
      nzComponentParams: {
        addnotesPlanNo: addnotesPlanNo
      },
      nzFooter: null,
      nzClassName: 'zj-modal',
      nzZIndex: 100,
      nzOnOk: () => {
        this.refreshData(true);
        },
      nzOnCancel: () => {
        console.log('销毁');
        this.refreshData(true);
      },
    });

  }
    delete(addnotesPlanNo) {
        addnotesPlanNo && this.service.delete( addnotesPlanNo)
            .subscribe(_data => {
                this.message.success('删除成功！');
                this.refreshData(true);
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
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
        console.log(params);
        this.service.page(params)
            .subscribe(_data => {
                this.dataSet = _data['retList'];
                this.page.totalRow = _data['totalRow'];
                this.loading = false;
                this.dataSet.forEach(data => {
                    data.lineList = data.lineList ? data.lineList : [];
                    const lineList = [];
                    data.lineList.forEach(element => {
                        lineList.push(element.lineName);
                    });
                    data.lineName = lineList.join('、');
                    data.lineNameTitle = lineList.join('\r\n');
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
            status: null,
            lineNo: null,
            urgencyFlag: null,
        });
        this.refreshData(true);
    }

    openModal(data, type) {
        this.service.step = type;
        this.service.ADDNOTE_MODE = data.lineMode;
        const StepFormModal = this.modal.create({
            nzWidth: '95%',
            nzWrapClassName: 'no-padding-modal',
            nzClassName: 'zj-modal',
            nzContent: StepFormComponent,
            nzComponentParams: {
                addnotesPlanNo: data.addnotesPlanNo
            },
            nzFooter: null,
            nzZIndex: 199,
          nzOnOk: () => {
              this.refreshData(true)
          },
            nzOnCancel: () => {
                this.refreshData(true);
            },
        });
    }

    openCrashPlan() {
        const addModal = this.modal.create({
            nzContent: AddCrashPlanComponent,
            nzWidth: '60%',
            nzClassName: 'zj-modal',
            nzFooter: null,
            nzMaskClosable: false,
            nzZIndex: 100,
            nzOnOk: () => {
                this.refreshData(true);
            },
            nzOnCancel: () => {}
        });
    }

    modifyCrashPlan(data) {
        const addModal = this.modal.create({
            nzContent: ReviseCrashPlanComponent,
            nzWidth: '90%',
            nzClassName: 'zj-modal',
            nzFooter: null,
            nzComponentParams: {
                addnotesPlanNo: data.addnotesPlanNo,
                clrCenterNo: data.clrCenterNo,
                submitable: true,
            },
            nzOnOk: () => {
                this.refreshData();
            },
            nzOnCancel: () => {}
        });
    }

}
