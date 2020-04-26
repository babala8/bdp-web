import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { SYS_CONS } from '../../../../../models/constant';
import { LockService } from '../../lock.service';

@Component({
  selector: 'app-add-lock',
  templateUrl: './add-lock.component.html',
})
export class AddLockComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  allDevList = [];
  lockStatus = SYS_CONS.LOCK_STATUS;

  constructor(private fb: FormBuilder,
              private service: LockService,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      lockCode: [null, Validators.required],
      state: [null, Validators.required],
      blockNum: [null, Validators.required],
      devNo: [null, Validators.required],
      cversion: [null, [Validators.required, Validators.maxLength(32)]],
      installDate: [null, Validators.required],
      madeDate: [null, Validators.required],
      version: [null, Validators.required],
      note: [null, Validators.maxLength(100)],
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
    params.installDate = params.installDate ? params.installDate.format('YYYY-MM-DD') : '';
    params.madeDate = params.madeDate ? params.madeDate.format('YYYY-MM-DD') : '';
    this.loading = true;
    this.service.addLock(params).subscribe(data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    });

  }
}
