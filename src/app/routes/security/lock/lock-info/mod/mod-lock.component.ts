import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { LockService } from '../../lock.service';
import { SessionService } from '@core/session.service';
import { SYS_CONS } from '../../../../../models/constant';

@Component({
  selector: 'app-mod-lock',
  templateUrl: './mod-lock.component.html',
})
export class ModLockComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  allDevList = [];
  lockStatus = SYS_CONS.LOCK_STATUS;
  data;


  constructor(private fb: FormBuilder,
              private service: LockService,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      lockCode: [{ value: this.data.lockCode, disabled: true }, Validators.required],
      state: [this.data.state, Validators.required],
      blockNum: [this.data.blockNum, Validators.required],
      devNo: [this.data.devNo, Validators.required],
      cversion: [this.data.cversion, [Validators.required, Validators.maxLength(32)]],
      installDate: [this.data.installDate, Validators.required],
      madeDate: [this.data.madeDate, Validators.required],
      version: [this.data.version, Validators.required],
      note: [this.data.note, Validators.maxLength(100)],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
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

    const params = this.validateForm.value;
    params['lockCode'] = this.data.lockCode;
    params.installDate = params.installDate ? new Date(params.installDate).format('YYYY-MM-DD') : '';
    params.madeDate = params.madeDate ? new Date(params.madeDate).format('YYYY-MM-DD') : '';
    this.loading = true;
    this.service.modLock(params).subscribe(data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );

    });

  }
}
