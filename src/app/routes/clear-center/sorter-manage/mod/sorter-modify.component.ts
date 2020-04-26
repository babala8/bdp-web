import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef, NzMessageService,} from 'ng-zorro-antd';
import {ClearCenterService } from '../../clear-center.service';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../../models/constant';

@Component({
    templateUrl: './sorter-modify.html'
})

export class SorterModifyComponent implements OnInit {
    devCount;
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
            devNo:[{value:this.devCount.devNo,disabled:true}, Validators.required],
            ip:[this.devCount.ip, Validators.required ],
            clrCenterNo: [this.devCount.clrCenterNo, Validators.required ],
            devModel: [this.devCount.devModel, Validators.required ],
            devStandards: [this.devCount.devStandards, Validators.required ],
            devType: [this.devCount.devType, Validators.required ],
            devStatus: [this.devCount.devStatus, Validators.required ],
            location: [this.devCount.location, Validators.required ],
            userDate: [this.devCount.userDate, Validators.required ],
            note: [this.devCount.note],
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
            devNo:this.devCount.devNo,
            clrCenterNo: this.validateForm.controls.clrCenterNo.value,
            devModel: this.validateForm.controls.devModel.value,
            ip: this.validateForm.controls.ip.value,
            devStandards: this.validateForm.controls.devStandards.value,
            devType:  this.validateForm.controls.devType.value,
            devStatus:  this.validateForm.controls.devStatus.value,
            location: this.validateForm.controls.location.value,
            userDate: this.validateForm.controls.userDate.value,
            note: this.validateForm.controls.note.value,
        };
        console.log(params);
        this.service.modDevCount(params)
          .subscribe(data => {
              console.log(data);
              this.message.success(data['retMsg']);
              this.nzModal.triggerOk();
          }, (error) => {
              console.log(error);
              if (error instanceof HttpResponse) {
                  this.message.error(error.body.retMsg);
                  this.nzModal.triggerOk();
              }

          });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
