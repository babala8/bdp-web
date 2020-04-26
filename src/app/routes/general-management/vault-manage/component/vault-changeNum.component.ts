import { Component, OnInit, } from '@angular/core';
import * as _ from 'lodash';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import {AppService} from '../../../../app.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SYS_CONS } from '../../../../models/constant';
import {GeneralManagementService} from "../../general-management.service";

@Component({
    templateUrl: 'vault-changeNum.html',
})
export class VaultChangeNumComponent implements OnInit {
    loading = false;
    validateForm: FormGroup;
    dataSet = [];
    formModel = {};
    data;

    constructor(
        private session: SessionService,
        private fb: FormBuilder,
        private nzSub: NzModalRef,
        private service: GeneralManagementService,
        private appService: AppService,
        private modal: NzModalService,
        private message: NzMessageService
    ) { }

    centerTypes = SYS_CONS.CENTER_TYPES;
    autoFlags = SYS_CONS.AUTO_FLAGS;
    centerLineMode = SYS_CONS.CENTER_LINE_MODE;

  ngOnInit() {
    console.log(this.data);
    this.validateForm = this.fb.group({
      clrCenterNo: [{value: this.data.clrCenterNo, disabled: true}, [Validators.required]],
      //clrCenterFlag: [this.org.clrCenterFlag, [Validators.required]],
      centerName: [{value: this.data.centerName, disabled: true}, [Validators.required]],
      autoFlag: [this.data.autoFlag, [Validators.required]],
      centerType: [this.data.centerType, [Validators.required]],
      lineMode: [this.data.lineMode, [Validators.required]]
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
          clrCenterNo: this.validateForm.controls.clrCenterNo.value || '',
          centerName: this.validateForm.controls.centerName.value,
          autoFlag: this.validateForm.controls.autoFlag.value,
          centerType: this.validateForm.controls.centerType.value,
          lineMode: this.validateForm.controls.lineMode.value,
        };

        this.loading = true;
        this.service.updateCenterNum(params)
          .subscribe(data => {
            this.loading = false;
            this.message.success('修改金库参数成功！');
            this.nzSub.triggerOk();
          });
      }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

}
