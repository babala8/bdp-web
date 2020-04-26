import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: './dev-type-add.html'
})

export class DevTypeAddComponent implements OnInit {
    validateForm: FormGroup;
    devVendors = [];
    devCatalogs = [];

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private service: ChannelCenterService,
                private message: NzMessageService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(30)]],
            vendorNo: [null, Validators.required],
            catalogNo: [null, Validators.required],
            cashType: [null, Validators.required]
        });

        const params = {};
        this.service.getDevVenders(params)
            .subscribe(data => {
                console.log(data);
                this.devVendors = data['retList'];
            });
        this.service.getDevCatalog(params)
            .subscribe(data => {
                console.log(data);
                this.devCatalogs = data['retList'];
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
            name: this.validateForm.controls.name.value,
            devVendor: this.validateForm.controls.vendorNo.value,
            devCatalog: this.validateForm.controls.catalogNo.value,
            cashType: this.validateForm.controls.cashType.value
        };
        console.log(params);

        this.service.addDevTypes(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
            }, (error) => {
                console.log(error);
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                    this.nzModal.destroy('NzOnCancel');
                }
            });
    }


    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
