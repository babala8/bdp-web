import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef} from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { SessionService } from '@core/session.service';
import { DtdLineManageService } from '../dtd-line-manage.service';

@Component({
  templateUrl: './dtd-line-mod.html',
})
export class DtdLineModComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  lineInfo;
  clrCenterNo;

  constructor(private fb: FormBuilder,
              private service: DtdLineManageService,
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
      lineNo: this.lineInfo.lineNo,
      lineName: this.validateForm.controls.description.value,
      clrCenterNo: this.clrCenterNo,
      lineType: 2,
      note: this.validateForm.controls.note.value,
    };

    const addParams = {
      data: params,
      type: 'mod',
    };
    this.loading = true;

    this.service.lineMod(params).subscribe(_data => {
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(`修改线路信息成功！`);
    }, (error) => {
      this.loading = false;
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    });
  }


  ngOnInit() {

    this.clrCenterNo = this.lineInfo.lineNo.substring(0, this.lineInfo.lineNo.length - 3);
    this.validateForm = this.fb.group({
      description: [this.lineInfo.lineName, [Validators.required, Validators.maxLength(20)]],
      clrCenterNo: [this.lineInfo.clrCenterNo, [Validators.required]],
      addClrPeriod: [this.lineInfo.addClrPeriod, [Validators.required]],
      note: [this.lineInfo.note],
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

