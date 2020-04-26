import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SpecialDateService } from '../special-date.service';

@Component({
    templateUrl: './special-date-add.html',
})

export class SpecialDateAddComponent implements OnInit {

    validateForm: FormGroup;
    startDate;
    loading;

    constructor(private fb: FormBuilder,
        private message: NzMessageService,
        private subject: NzModalRef,
        private service: SpecialDateService) {
    }

    ngOnInit() {
        const startDay = (new Date());
        const endDay = (new Date());

        this.validateForm = this.fb.group({
            clrCenterNo: [null, [Validators.required]],
            startDate: [startDay, [Validators.required]],
            endDate: [endDay, [Validators.required, this.checkDate()]],
            addnotesCoeff: [null, [Validators.required, Validators.max(2)]],
        });

        this.startDate = this.validateForm.controls['startDate'];
        this.startDate.valueChanges.subscribe((value) => {
            this.validateForm.controls['endDate'].updateValueAndValidity();
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

        this.loading = true;
        const params: any = {
            ...this.validateForm.value,
            startDate: this.validateForm.controls['startDate'].value.format('YYYY-MM-DD'),
            endDate: this.validateForm.controls['endDate'].value.format('YYYY-MM-DD')
        };

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

    formattingData(data) {
        const year = data.getFullYear() + '-';
        const month = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) + '-' : (data.getMonth() + 1) + '-';
        const day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();

        data = year + month + day;
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
