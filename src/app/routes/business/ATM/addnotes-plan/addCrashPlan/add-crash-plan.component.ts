import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core';
import * as moment from 'moment';
import {NzMessageService, NzModalService, NzModalRef} from 'ng-zorro-antd';
import {AddnotesPlanService} from '../addnotes-plan.service';
import {ReviseCrashPlanComponent} from './component/reviseCrashPlan.component';
import { AppService } from 'app/app.service';
import { SYS_CONS } from '../../../../../models/constant';

@Component({
    templateUrl: './add-crash-plan.html',
    styleUrls: ['./add-crash-plan.less']
})
export class AddCrashPlanComponent implements OnInit {
    addnotesPlanNo;
    validateForm: FormGroup;
    loading = false;

    constructor(private fb: FormBuilder,
                private session: SessionService,
                private message: NzMessageService,
                private appService: AppService,
                private service: AddnotesPlanService,
                private modal: NzModalService,
                private nzSubject: NzModalRef) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
                clrCenterNo: [null, [Validators.required]],
            }
        );
    }

    addCrashPlan(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        if (this.validateForm.invalid) {
            return;
        }
        this.loading = true;
        const params = {
            genOpNo: this.session.userId,
            clrCenterNo: this.validateForm.value.clrCenterNo,
            planAddnotesDate: moment().format('YYYY-MM-DD'),
            groupMode: SYS_CONS.ADDNOTE_MODE.DYNAMIC,
            awayFlag: 0,
            isUrgency: 1,
        };
        // this.predict_loading = true;
        this.service.add(params)
            .subscribe(_data => {
                this.loading = false;
                this.addnotesPlanNo = _data.element.addnotesPlanNo;
                // this.bindPlanAndDevs();
                this.openRevise();
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    openRevise() {
        const reviseModal = this.modal.create({
            nzContent: ReviseCrashPlanComponent,
            nzWidth: '95%',
            nzComponentParams: {
                addnotesPlanNo: this.addnotesPlanNo,
                submitable: false,
                clrCenterNo: this.validateForm.value.clrCenterNo
            },
            nzZIndex: 200,
            nzOnOk: () => {
                this.nzSubject.triggerOk();
            },
            nzOnCancel: () => {
                if (!!this.addnotesPlanNo) {
                    this.nzSubject.triggerOk();
                } else {
                    this.nzSubject.triggerCancel();
                }
            },
            nzMaskClosable: false,
            nzFooter: null,
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
