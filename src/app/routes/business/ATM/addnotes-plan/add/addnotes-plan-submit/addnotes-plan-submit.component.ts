import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalRef, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AddnotesPlanService} from '../../addnotes-plan.service';
import {HttpResponse} from '@angular/common/http';
import * as moment from 'moment';
import * as _ from 'lodash';

import {StepFormComponent} from './../step-form/step-form.component';
import { SessionService } from '@core';
import { AppService } from 'app/app.service';
import { EventBus } from '../../../../../../core/utils.service';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
    templateUrl: './addnotes-plan-submit.html',

})

export class AddnotesPlanSubmitComponent implements OnInit {
    validateForm: FormGroup;
    addnotesPlanNo: string;
    loading;
    awayFlags = [
        {label: '全部', value: 0},
        {label: '附行', value: 1},
        {label: '离行', value: 2},
    ];
    lines = [];
    MODE_ENUM = SYS_CONS.ADDNOTE_MODE;

    constructor(private fb: FormBuilder,
                private modal: NzModalService,
                private message: NzMessageService,
                private eventBus: EventBus,
                private appservice: AppService,
                private session: SessionService,
                private subject: NzModalRef,
                public service: AddnotesPlanService) {
    }

    ngOnInit() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.validateForm = this.fb.group({
            clrCenterNo: [null, [Validators.required]],
            planAddnotesDate: [new Date(), [Validators.required]],
            awayFlag: [this.awayFlags[0].value],
            lineNo: [[], []]
        });

        this.validateForm.controls['clrCenterNo'].valueChanges.subscribe(
            data => {
                this.getAddNoteMode(data);
            }
        );
        this.validateForm.controls['planAddnotesDate'].valueChanges.subscribe(
            data => {
                this.getAddNoteMode(this.validateForm.controls['clrCenterNo'].value);
                // this.getLinesOfDay(this.validateForm.controls['clrCenterNo'].value, data);
            }
        );
    }


    getAddNoteMode(clrCenterNo) {
        this.service.getAddNoteMode(clrCenterNo).subscribe(
            result => {
                this.service.ADDNOTE_MODE = result.paramValue || SYS_CONS.ADDNOTE_MODE.FIX;
                console.log(this.service.ADDNOTE_MODE , SYS_CONS.ADDNOTE_MODE.FIX);
                if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.FIX) {
                    this.getLinesOfDay(clrCenterNo, this.validateForm.controls['planAddnotesDate'].value);
                } else if (this.service.ADDNOTE_MODE === SYS_CONS.ADDNOTE_MODE.DYNAMIC) {
                    this.lines = [];
                    this.service.getLinesByClrCenter({clrCenterNo: clrCenterNo}).subscribe(
                        data => {
                            this.lines = data.retList;
                        }
                    );
                }
            }
        );
    }
    getLinesOfDay(clrCenterNo, date) {
        this.service.getLinesOfday({
            lineDate: moment(date).format('YYYY-MM-DD'),
            clrCenterNo: clrCenterNo,
        }).subscribe(
            data => {
                this.lines = data.retList;
            }
        );
        this.validateForm.patchValue(
            {lineNo: []}
        );
    }

    add() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        if (this.validateForm.invalid) {
            return;
        }

        this.loading = true;
        const controls = this.validateForm.controls;
        const params = {
            genOpNo: this.session.userId,
            clrCenterNo: controls.clrCenterNo.value,
            planAddnotesDate: moment(controls.planAddnotesDate.value).format('YYYY-MM-DD'),
            groupMode: this.service.ADDNOTE_MODE,
            groupNo: controls.lineNo.value.length == 0 ? JSON.stringify(_.map(this.lines, 'lineNo')) : controls.lineNo.value,
            awayFlag: this.validateForm.controls.awayFlag.value
        };

        this.service.add(params)
            .subscribe(_data => {
                this.addnotesPlanNo = _data.element.addnotesPlanNo;
                this.loading = false;
                this.subject.triggerOk();
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

/*    openStepForm() {
        this.subject.destroy();
        this.service.step = 0;
        const StepFormModal = this.modal.create({
            nzWidth: '95%',
            nzWrapClassName: 'no-padding-modal',
            nzContent: StepFormComponent,
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo
            },
            nzFooter: null,
            nzZIndex: 100,
            nzOnCancel: () => {
                this.eventBus.events.next();
            },
        });

    }*/

    validateDate(today: Date): ValidatorFn {
        return function (control) {
            if (control.value) {
                return moment(today).isSameOrBefore(control.value) ? null : {
                    min: true,
                    error: true,
                    explain: '计划加钞日期不能小于当前日期'
                };
            }
            return null;
        };
    }

}
