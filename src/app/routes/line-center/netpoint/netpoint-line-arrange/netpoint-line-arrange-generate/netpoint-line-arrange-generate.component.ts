import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { NetpointLineArrangeService } from '../netpoint-line-arrange.service';

@Component({
    templateUrl: './netpoint-line-arrange-generate.html'
})
export class NetpointLineArrangeGenerateComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;
    lineList = [];
    theMonth = new Date().getMonth();

    constructor(private fb: FormBuilder,
        private service: NetpointLineArrangeService,
        private nzModal: NzModalRef,
        private session: SessionService,
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
        };

        this.loading = true;

        this.service.generateNetworkRunMap(params).subscribe(_data => {
            this.loading = false;
            this.message.success(`生成网点线路表成功！`);
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
            lineNo: [null, []],
            clrCenterNo: [null, [Validators.required]],
            theYearMonth: [new Date(), [Validators.required]],
        });
    }

    getLineList(value: string): void  {
        if(!value){
            return;
        }
        const params = { clrCenterNo: value, lineType: 1 };
        this.service.qryNetLine(params)
            .subscribe(_data => {
                this.lineList = _data.retList;
                this.lineList.unshift(
                    {note: null, lineNo: null, addClrPeriod: null, description: "全部"});
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

    _disabledDate = (startValue) => {
        if (!startValue || !this.validateForm.controls['theYearMonth'].value) {
            return false;
        }
        return startValue.getMonth() < this.theMonth;
    };

    //时间转换
    formatDay(date) {
        if (date == null) {
            return null;
        }
        const cDay = date.getFullYear() + '-' +
            (date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
        return cDay;
    }
}

