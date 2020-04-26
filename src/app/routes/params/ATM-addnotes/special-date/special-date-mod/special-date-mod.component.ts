import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SpecialDateService } from '../special-date.service';


@Component({
    templateUrl: './special-date-mod.html',
})

export class SpecialDateModComponent implements OnInit {

    validateForm: FormGroup;
    clrCenterList = [];
    data: any;
    loading;

    constructor(private fb: FormBuilder,
        private message: NzMessageService,
        private subject: NzModalRef,
        private service: SpecialDateService) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            clrCenterNo: [{value:this.data.clrCenterNo, disabled: true}, [Validators.required]],
            startDate: [{value:this.data.startDate, disabled: true}, [Validators.required]],
            endDate: [{value:this.data.endDate, disabled: true}, [Validators.required]],
            addnotesCoeff: [this.data.addnotesCoeff, [Validators.required, Validators.max(2)]],
            clrCenterName: [{value:this.data.clrCenterName, disabled: true}]
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
            clrCenterNo: this.data.clrCenterNo,
            clrCenterName: this.data.clrCenterName,
            addnotesCoeff: this.validateForm.controls.addnotesCoeff.value,
            startDate: this.data.startDate,
            endDate: this.data.endDate,
        };

        this.loading = true;
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


}
