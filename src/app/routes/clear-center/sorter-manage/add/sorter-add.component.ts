import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {ClearCenterService } from '../../clear-center.service';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../../models/constant';

@Component({
    templateUrl: './sorter-add.html'
})

export class SorterAddComponent implements OnInit {
    validateForm: FormGroup;
    statusList = SYS_CONS.DEV_STATUS;
    typeList = SYS_CONS.DEV_TYPE;

    constructor(private fb: FormBuilder,
                private nzModal: NzModalRef,
                private message: NzMessageService,
                private service: ClearCenterService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            devNo:[null, Validators.required ],
            clrCenterNo: [null, Validators.required ],
            devModel: [null, Validators.required ],
            devStandards: [null, Validators.required ],
            devType: [null, Validators.required ],
            devStatus: [null, Validators.required ],
            ip: [null, Validators.required ],
            location: [null, Validators.required ],
            userDate: [null, Validators.required ],
            note: [null],
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
        console.log(this.validateForm.controls)

        const params = {
            clrCenterNo: this.validateForm.controls.clrCenterNo.value,
            devModel: this.validateForm.controls.devModel.value,
            devNo: this.validateForm.controls.devNo.value,
            ip: this.validateForm.controls.ip.value,
            devStandards: this.validateForm.controls.devStandards.value,
            devType:  this.validateForm.controls.devType.value,
            devStatus:  this.validateForm.controls.devStatus.value,
            location: this.validateForm.controls.location.value,
            userDate: this.validateForm.controls.userDate.value.format('YYYY-MM-DD') ,
            note: this.validateForm.controls.note.value,
        };
        console.log(params);
        this.service.addDevCount(params)
            .subscribe(data => {
                console.log(data);
                this.message.success(data['retMsg']);
                this.nzModal.triggerOk();
            }, (error) => {
                console.log(error);
                this.nzModal.triggerOk();
                if (error instanceof HttpResponse) {
                    this.message.error(error.body.retMsg);
                }

            });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
