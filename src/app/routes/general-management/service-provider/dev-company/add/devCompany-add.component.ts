import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {ServiceProviderService} from "../../service-provider.service";

@Component({
    templateUrl: './devCompany-add.html',
})

export class DevCompanyAddComponent implements OnInit {
    validateForm: FormGroup;

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private devCompanyService: ServiceProviderService,
                private message: NzMessageService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(50)]],
            linkman: [null, [Validators.required, Validators.maxLength(30)]],
            address: [null, [Validators.required, Validators.maxLength(80)]],
            phone: [null, [Validators.pattern("[0-9-()（）]{7,18}")]],
            mobile: [null, [Validators.pattern("0?(13|14|15|18)[0-9]{9}")]],
            fax: [null, [Validators.maxLength(30)]],
            email: [null, [Validators.email, Validators.maxLength(40)]],
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
            name: this.validateForm.controls.name.value,
            linkman: this.validateForm.controls.linkman.value,
            address: this.validateForm.controls.address.value,
            phone: this.validateForm.controls.phone.value,
            mobile: this.validateForm.controls.mobile.value,
            fax: this.validateForm.controls.fax.value,
            email: this.validateForm.controls.email.value,
            type: 1
        };
        console.log(params);

        this.devCompanyService.addDevCompanys(params)
          .subscribe(data => {
              console.log(data);
              this.message.success(data['retMsg']);
              this.nzModal.triggerOk();
          }, (error) => {
              console.log(error);
              if (error instanceof HttpResponse) {
                  this.message.error(error.body.retMsg);
                  this.nzModal.triggerCancel();
              }
          });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
