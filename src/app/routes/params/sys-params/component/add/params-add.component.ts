import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpResponse} from '@angular/common/http';
import {SysParamsService} from "../../sys-params.service";

@Component({
    templateUrl: './params-add.html'
})
export class ParamsAddComponent implements OnInit {
    validateForm: FormGroup;
    paramCatalogList=[];
    loading = false;

    constructor(private fb: FormBuilder,
                private service: SysParamsService,
                private nzModal: NzModalRef,
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
            logicId: '',
            paramName: this.validateForm.controls.paramName.value,
            paramValue: this.validateForm.controls.paramValue.value,
            catalog: this.validateForm.controls.catalog.value,
            statement: this.validateForm.controls.statement.value,
            description: this.validateForm.controls.description.value,
        };
        this.loading = true;
        this.service.addParam(params)
            .subscribe(_data => {
                this.loading = false;
                this.message.success(`添加参数信息成功！`);
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
            paramName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
            paramValue: [null, [Validators.required, Validators.maxLength(20)]],
            catalog: [null, [Validators.required]],
            statement: [null, [Validators.required, Validators.maxLength(30)]],
            description: [null, [Validators.required, Validators.maxLength(30)]],
        });
        this.getAllParamType();
    }

    getAllParamType(){
        this.service.qryParamTypeList()
        .subscribe(_data => {
            console.log(_data);
            this.paramCatalogList = _data['retList'];
        }, (error) => {
            console.log(error);
            if (error instanceof HttpResponse) {
                this.message.error(error.body.retMsg);
            }
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }


}

