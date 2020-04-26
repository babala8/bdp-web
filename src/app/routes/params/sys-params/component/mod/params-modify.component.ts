import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SysParamsService } from "../../sys-params.service";

@Component({
  templateUrl: './params-modify.html',
})
export class ParamsModifyComponent implements OnInit {
  validateForm: FormGroup;
  paramCatalogList = [];
  loading = false;
  paramInfo;

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
      logicId: this.paramInfo.logicId,
      paramName: this.validateForm.controls.paramName.value,
      paramValue: this.validateForm.controls.paramValue.value,
      catalog: this.validateForm.controls.catalog.value,
      statement: this.validateForm.controls.statement.value,
      description: this.validateForm.controls.description.value,
    };
    this.loading = true;
    this.service.updateParamInfo(params)
      .subscribe(_data => {
        this.loading = false;
        this.message.success(`修改参数信息成功！`);
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
      logicId: [{ value: this.paramInfo.logicId, disabled: true }, [Validators.required]],
      paramName: [{value: this.paramInfo.paramName, disabled: true }, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      paramValue: [this.paramInfo.paramValue, [Validators.required, Validators.maxLength(20)]],
      catalog: [this.paramInfo.catalog, [Validators.required]],
      statement: [this.paramInfo.statement, [Validators.required, Validators.maxLength(100)]],
      description: [this.paramInfo.description, [Validators.required, Validators.maxLength(100)]],
    });
    this.getAllParamType();
  }

  getAllParamType() {
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

