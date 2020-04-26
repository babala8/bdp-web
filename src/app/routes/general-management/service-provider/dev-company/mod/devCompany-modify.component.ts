import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {ServiceProviderService} from "../../service-provider.service";

@Component({
    templateUrl: './devCompany-modify.html',
})

export class DevCompanyModifyComponent implements OnInit {
    validateForm: FormGroup;
    devCompanyInfo;


    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private devCompanyService: ServiceProviderService,
                private message: NzMessageService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            no: [this.devCompanyInfo.no, Validators.required],
            name: [this.devCompanyInfo.name, [Validators.required, Validators.maxLength(50)]],
            linkman: [this.devCompanyInfo.linkman, [Validators.required, Validators.maxLength(30)]],
            address: [this.devCompanyInfo.address, [Validators.required, Validators.maxLength(80)]],
            phone: [this.devCompanyInfo.phone, [Validators.pattern("[0-9-()（）]{7,18}")]],
            mobile: [this.devCompanyInfo.mobile, [Validators.pattern("0?(13|14|15|18)[0-9]{9}")]],
            fax: [this.devCompanyInfo.fax, [Validators.maxLength(30)]],
            email: [this.devCompanyInfo.email, [Validators.email, Validators.maxLength(40)]],
        });

    }

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
        }

        if (this.validateForm.invalid) {
            return;
        }

        const params = {
            no: this.devCompanyInfo.no,
            name: this.validateForm.controls.name.value,
            linkman: this.validateForm.controls.linkman.value,
            address: this.validateForm.controls.address.value,
            phone: this.validateForm.controls.phone.value,
            mobile: this.validateForm.controls.mobile.value,
            fax: this.validateForm.controls.fax.value,
            email: this.validateForm.controls.email.value,
            type:1
        };
        console.log(params);

        this.devCompanyService.modDevCompanys(params)
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

        // this.devTypeService.manageDevTypes(params)
        //     .subscribe(data => {
        //         console.log(data);
        //         if (data['retCode'] === '00000') {
        //             this.message.success(data['retMsg']);
        //             this.nzModal.destroy('onOk');
        //         }else {
        //             this.message.error(data['retMsg']);
        //             this.nzModal.destroy('onCancel');
        //         }
        //     });
    }


    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
