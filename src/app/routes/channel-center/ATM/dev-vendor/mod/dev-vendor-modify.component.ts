import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: './dev-vendor-modify.html'
})

export class DevVendorModifyComponent implements OnInit {
    validateForm: FormGroup;
    devVendor;

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private message: NzMessageService,
                private service: ChannelCenterService) {
    }

    ngOnInit(): void {
        console.log('打印我');
        this.validateForm = this.fb.group({
            no: [{value:this.devVendor.no, disabled:true },Validators.required],
            name: [this.devVendor.name, Validators.required]
        });
        console.log(this.devVendor);
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
                no: this.devVendor.no,
                name: this.validateForm.controls.name.value
        };
        console.log(params);
        this.service.modDevVendors(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                    this.nzModal.destroy('onCancel');
                }
            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
