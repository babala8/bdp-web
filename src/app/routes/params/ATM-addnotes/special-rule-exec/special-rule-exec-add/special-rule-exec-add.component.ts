import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SessionService } from '@core';
import { SpecialRuleExecService } from '../special-rule-exec.service';
import { Page } from '../../../../../models/page';

@Component({
    templateUrl: './special-rule-exec-add.html',
})

export class SpecialRuleExecAddComponent implements OnInit {

    validateForm: FormGroup;
    startDate;
    endDate;
    page = new Page();
    devInitList = [];
    ruleList = [];
    devFilterList = [];

    constructor(private fb: FormBuilder,
        private session: SessionService,
        private message: NzMessageService,
        private subject: NzModalRef,
        private service: SpecialRuleExecService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            devNo: [null, [Validators.required, Validators.maxLength(40)]],
            clrCenterNo: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required, this.checkDate()]],
            addnotesRuleId: [null, [Validators.required, Validators.maxLength(40)]],
            ruleDesp: [null, [Validators.maxLength(40)]],
        });
        this.startDate = this.validateForm.controls['startDate'];

        this.startDate.valueChanges.subscribe((value) => {
            this.validateForm.controls['endDate'].updateValueAndValidity();
        });

    }

    ruleListFilter(ruleDesp) {
        this.ruleList.splice(0, this.ruleList.length);
        if (ruleDesp.length < 2) {
            return;
        }
        const params = {
            ruleDesp: ruleDesp,
            clrCenterNo: this.validateForm.controls.clrCenterNo.value,
        };
        this.service.qryAllRules(params)
            .subscribe(_data => {
                this.ruleList = _data['retList'];
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    devListInit(clrCenterNo) {
        this.validateForm.controls.devNo.setValue(null);
        const params = {
            clrCenterNo: clrCenterNo
        };
        this.service.getDevInfos(params)
            .subscribe(_data => {
                this.devInitList = _data['retList'];
                console.log(this.devInitList)
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    devFilter(devNo) {
        this.devFilterList.splice(0, this.devFilterList.length);
        if (devNo.length < 6) {
            return;
        }
        this.devInitList.forEach(element => {
            if (element.no.indexOf(devNo) !== -1)
                this.devFilterList.push(element);
        });
        if (this.devFilterList.length > 20) {
            this.devFilterList = this.devFilterList.slice(0, 20);
        }
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

        const params: any = {};
        // @ts-ignore
        params = this.validateForm.value;
        params['startDate'] = this.formattingData(params['startDate']);
        params['endDate'] = this.formattingData(params['endDate']);
        this.service.add(params)
            .subscribe(_data => {
                this.message.success(_data.retMsg);
                this.subject.triggerOk();
            }, (error) => {
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }
            });
    }

    formattingData(data) {
        if (typeof data != 'string' && data) {
            const year = data.getFullYear() + '-';
            const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) + '-' : (data.getMonth() + 1) + '-';
            const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
            data = year + month + day;
        }
        return data;
    }

    checkDate(): ValidatorFn {
        return (control) => {
            const form = this.validateForm;
            if (!form) return null;
            const startDate = form.get('startDate').value;
            const endDate = form.get('endDate').value;

            if (startDate && endDate) {
                return endDate >= startDate ? null : { min: true, error: true, explain: '结束日期必须大于等于开始日期' };
            }
            return null;
        };
    }
}
