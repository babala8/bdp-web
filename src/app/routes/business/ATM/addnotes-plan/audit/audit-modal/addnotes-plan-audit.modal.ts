import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpResponse, HttpRequest} from '@angular/common/http';
import {AddnotesPlanService} from './../../addnotes-plan.service';
import * as _ from 'lodash';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
    templateUrl: 'addnotes-plan-audit.modal.html',
})

export class AddnotesPlanAuditModal implements OnInit {

    loading = true;
    loading_operating = false;
    addnotesPlanNo: string;
    detailList = [];
    dataset = [];
    groups = [];
    validateForm: FormGroup;

    constructor(
        private message: NzMessageService,
        private service: AddnotesPlanService,
        private modal: NzModalRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            addnotesPlanNo: [this.addnotesPlanNo],
            opinion: ['', [Validators.required, Validators.maxLength(300)]]
        });
        this.getDetail();

    }

    getDetail() {
        this.service.detail(this.addnotesPlanNo)
            .subscribe(_data => {
                this.loading = false;
                console.log('获取审核计划详情');
                const addnotesPlan = _data.element.addnotesPlan;
                const state = _.filter(SYS_CONS.STATE.ADDNOTE_PLAN, {value: parseInt(addnotesPlan.status)});
                this.detailList = [
                    {name: '计划批次', value: addnotesPlan.addnotesPlanNo},
                    {name: '金库', value: addnotesPlan.clrCenterName},
                    {name: '加钞日期', value: addnotesPlan.planAddnotesDate},
                    {name: '状态', value: state.length > 0 ? state[0].label : '未知'},
                    {name: '设备台数', value: addnotesPlan.planDevCount},
                    {name: '加钞总量(万元)', value: addnotesPlan.planAddnotesAmt / 10000},
                ];
                this.dataset = _data['element'].detailList;
                const agg = _.groupBy(this.dataset, 'lineNo');
                console.log(agg);
                for (const index in agg) {
                    this.groups.push({
                        lineName: agg[index][0].devLineName,
                        lineNo: index,
                        devCount: agg[index].length,
                        cashReqAmt: (_.sumBy(agg[index], (o) => o.planAddnotesAmt) / 10000.0).toFixed(0),
                        devList: _.orderBy(agg[index], ['sortNo'], ['asc']),
                        flag: false
                    });
                }
                console.log(this.groups);
            }, error => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    showPanel(dev) {
        dev.flag = !dev.flag;
    }

    // 同意出单
    audit() {
        if (!this.validateForm.controls.opinion.value) {
            this.validateForm.controls.opinion.setValue('同意');
        }
        this.loading_operating = true;
        this.service.auditPlan(this.validateForm.value).subscribe(
            data => {
                this.loading_operating = false;
                this.message.success(data.retMsg);
                this.modal.triggerOk();
            },
            error => {
                this.loading_operating = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }
    // 退回
    refuse() {
      if (!this.validateForm.controls.opinion.value) {
        this.message.warning('请填写审批意见!');
        return;
      }
        // for (const key in this.validateForm.controls) {
        //     this.validateForm.controls[key].markAsDirty();
        // }
        // if (this.validateForm.invalid) {
        //     return;
        // }
        this.loading_operating = true;
        this.service.refusePlan(this.validateForm.value).subscribe(
            data => {
                this.loading_operating = false;
                this.message.success(data.retMsg);
                this.modal.triggerOk();
            },
            error => {
                this.loading_operating = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            }
        );
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
