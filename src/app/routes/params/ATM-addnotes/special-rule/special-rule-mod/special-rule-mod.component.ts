import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SpecialRuleService } from '../special-rule.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: 'special-rule-mod.html',
})

export class SpecialRuleModComponent implements OnInit {
    validateForm: FormGroup;
    ruleId;
    loading;
    detail: any = {};

    constructor(private fb: FormBuilder,
        private subject: NzModalRef,
        private message: NzMessageService,
        private service: SpecialRuleService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            ruleId: [{value:null,disabled:true}, [Validators.required]],
            ruleDesp: [{value:null,disabled:true}, [Validators.required]],
            addnotesCoeff: [null, [Validators.required, Validators.max(2)]],
            quotaRatio: [null, [Validators.required, Validators.max(1)]],
            addnotesPeriod: [null, [Validators.required]],
            ruleGenDate: [{value:null,disabled:true}],
            ruleGenOpName: [{value:null,disabled:true}]
        });

        this.getDetail();
    }

    getDetail() {
        const params = { ruleId: this.ruleId };
        this.service.detail(params)
            .subscribe(_data => {
                this.detail = _data.element;
                this.validateForm.controls.ruleDesp.setValue(this.detail.ruleDesp);
                this.validateForm.controls.ruleId.setValue(this.detail.ruleId);
                this.validateForm.controls.addnotesCoeff.setValue(this.detail.addnotesCoeff);
                this.validateForm.controls.quotaRatio.setValue(this.detail.quotaRatio);
                this.validateForm.controls.addnotesPeriod.setValue(this.detail.addnotesPeriod);
                this.validateForm.controls.ruleGenDate.setValue(this.detail.ruleGenDate);
                this.validateForm.controls.ruleGenOpName.setValue(this.detail.ruleGenOpName);
            });
    }

    modify() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params = {
            // clrCenterNo: this.validateForm.controls.clrCenterNo.value,
            ruleId: this.validateForm.controls.ruleId.value,
            addnotesCoeff: this.validateForm.controls.addnotesCoeff.value,
            quotaRatio: this.validateForm.controls.quotaRatio.value,
            addnotesPeriod: this.validateForm.controls.addnotesPeriod.value,
            ruleDesp: this.validateForm.controls.ruleDesp.value,
        };
        this.loading = true;
        console.log(params)

        this.service.modify(params)
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


    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
