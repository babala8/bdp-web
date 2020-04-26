import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SessionService } from '@core/session.service';
import { CirculationService } from '../../circulation.service';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../../models/constant';

@Component({
  templateUrl: './escort-arrange-add.html',
})

export class EscortArrangeAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  groupType = SYS_CONS.GROUPTYPE;
  lineList;
  constructor(private fb: FormBuilder,
              private service: CirculationService,
              private session: SessionService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      clrCenterNo: [null, [Validators.required]],
      lineNos: [null, [Validators.required]],
      dateRange: [null, [Validators.required]],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getLineList(value: string): void {
    const params = {
      clrCenterNo: value
    };
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
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
    var params = {
      clrCenterNo: this.validateForm.value.clrCenterNo,
      lineNos: this.validateForm.value.lineNos,
      startDate: this.validateForm.value.dateRange[0].format('YYYY-MM-DD'),
      endDate: this.validateForm.value.dateRange[1].format('YYYY-MM-DD')
    };
    console.log(params)
    this.loading = true;
    this.service.addEscort(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `生成押运人员排班成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }


}

