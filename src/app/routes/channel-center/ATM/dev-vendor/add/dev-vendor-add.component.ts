import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: './dev-vendor-add.html'
})

export class DevVendorAddComponent implements OnInit {
    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private message: NzMessageService,
                private service: ChannelCenterService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(20)]]
        });
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
                no: '',
                name: this.validateForm.controls.name.value
        };
        console.log(params);
        this.service.addDevVendors(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
                // this.nzModal.destroy('onOk');
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
