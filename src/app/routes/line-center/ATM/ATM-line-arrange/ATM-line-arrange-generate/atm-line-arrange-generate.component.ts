import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { ATMLineArrangeService } from '../atm-line-arrange.service';

@Component({
    templateUrl: './atm-line-arrange-generate.html'
})
export class ATMLineArrangeGenerateComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    lineList = [];

    constructor(private fb: FormBuilder,
        private service: ATMLineArrangeService,
        private nzModal: NzModalRef,
        private message: NzMessageService) {
    }

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params = {
            lineNo: this.validateForm.controls.lineNo.value,
            clrCenterNo: this.validateForm.controls.clrCenterNo.value || '',
            theYearMonth: this.formatDay(this.validateForm.controls.theYearMonth.value),
            type: 1,//运行图类型 1：设备；2：网点
        };
        this.loading = true;
        this.service.generateRunMap(params).subscribe(_data => {
            this.loading = false;
            this.message.success(`生成线路表成功！`);
            this.nzModal.triggerOk();
        }, (error) => {
            this.loading = false;
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            lineNo: [null],
            clrCenterNo: [null, [Validators.required]],
            theYearMonth: [new Date(), [Validators.required]],
        });
    }

    getLineList(value: string): void  {
        if(!value){
            return;
        }
        const params = { clrCenterNo: value,lineType: 0 };
        this.service.qryAllLine(params)
            .subscribe(_data => {
                this.lineList = _data.retList;
                this.lineList.unshift(
                    {note: null, lineNo: null, addClrPeriod:null, description: "全部"});
            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }


    updateConfirmValidator() {
        setTimeout(() => {
            this.validateForm.controls['name'].updateValueAndValidity();
        });
    }

    _disabledDate(current: Date): boolean {
        return current && (current.getFullYear() <= new Date().getFullYear()) && (current.getMonth() < new Date().getMonth());
    }

    // 时间转换
    formatDay(date) {
        if (date == null) {
            return null;
        }
        const cDay = date.getFullYear() + '-' +
            (date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
        return cDay;
    }
}

