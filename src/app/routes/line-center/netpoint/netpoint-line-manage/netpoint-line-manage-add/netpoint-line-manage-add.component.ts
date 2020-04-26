import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SessionService} from '@core/session.service';
import { NetpointLineManageService } from '../netpoint-line-manage.service';

@Component({
    templateUrl: './netpoint-line-manage-add.html'
})
export class NetpointLineManageAddAddComponent implements OnInit {
    validateForm: FormGroup;
    loading = false;

    constructor(private fb: FormBuilder,
                private service: NetpointLineManageService,
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
            lineNo: '123',
            lineName: this.validateForm.controls.description.value,
            lineType: '1',
            clrCenterNo: this.validateForm.controls.clrCenterNo.value || '',
            note: this.validateForm.controls.note.value,
        };

        const addParams = {
            data: params,
            type: 'add'
        };
        this.loading = true;

        this.service.lineAdd(params).subscribe(_data => {
            this.loading = false;
            this.message.success(`添加线路信息成功！`);
            this.nzModal.triggerOk();
        }, (error) => {
            this.loading = false;
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }


    ngOnInit() {
        this.validateForm = this.fb.group({
            description: [null, [Validators.required, Validators.maxLength(20)]],
            clrCenterNo: [null, [Validators.required]],
            note: [null],
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


}

