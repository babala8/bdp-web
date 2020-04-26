import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SpecialRuleService} from '../special-rule.service';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import { SessionService } from '@core';

@Component({
    templateUrl: 'special-rule-add.html',
})

export class SpecialRuleAddComponent implements OnInit {
    validateForm: FormGroup;
    loading;

    constructor(private fb: FormBuilder,
                private session: SessionService,
                private message: NzMessageService,
                private subject: NzModalRef,
                private service: SpecialRuleService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            clrCenterNo: [null, [Validators.required]],
            ruleDesp: [null, [Validators.required, Validators.maxLength(40)]],
            addnotesCoeff: [null, [Validators.required, Validators.max(2)]],
            quotaRatio: [null, [Validators.required, Validators.max(1)]],
            addnotesPeriod: [null, [Validators.required]],
        });

    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    add() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }

        if (this.validateForm.invalid) {
            return;
        }
        const params = Object.assign({}, this.validateForm.value, {ruleGenOpNo: this.session.userId}, {clrCenterNo: this.validateForm.controls.clrCenterNo.value});

        this.loading = true;

        this.service.add(params)
            .subscribe(_data => {
                this.loading = false;
                this.message.success(_data.retMsg);
                this.subject.triggerOk();
            }, (error) => {
                this.loading = false;
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

}
