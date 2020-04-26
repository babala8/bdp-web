import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators}  from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { ChannelCenterService } from '../../../channel-center.service';


@Component({
    templateUrl: './dev-type-modify.html'
})

export class DevTypeModifyComponent implements OnInit {
    validateForm: FormGroup;
    devVendors = [];
    devCatalogs = [];
    devType;

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private message: NzMessageService,
                private service: ChannelCenterService,
                ) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            no: [{value:this.devType.no,disabled:true}, Validators.required],
            name: [this.devType.name, [Validators.required, Validators.maxLength(30)]],
            vendorNo: [this.devType.devVendorTable.no, Validators.required],
            catalogNo: [this.devType.devCatalogTable.no, Validators.required],
            cashType: [this.devType.cashType, Validators.required]
        });
        console.log(this.devType);
        const params = {};
        this.service.getDevVenders(params)
            .subscribe(data => {
                console.log(data);
                this.devVendors = data['retList'];
            });
        this.service.getDevCatalogs(params)
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
            no: this.devType.no,
            name: this.validateForm.controls.name.value,
            devVendor: this.validateForm.controls.vendorNo.value,
            devCatalog: this.validateForm.controls.catalogNo.value,
            cashType: this.validateForm.controls.cashType.value
        };
        console.log(params);
        this.service.modDevTypes(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
            },(error) => {
                this.message.error(error.body.retMsg);
                this.nzModal.destroy('NzOnCancel');
            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
