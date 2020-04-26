import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { DtdLineArrangeService } from '../dtd-line-arrange.service';
import { SessionService } from '@core';


@Component({
  templateUrl: './dtd-line-arrange-add.html',
})
export class DtdLineArrangeAddComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  lineList;

  constructor(private fb: FormBuilder,
              private service: DtdLineArrangeService,
              private session: SessionService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  postss;
  showFlag = false;

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [null, [Validators.required]],
      lineNo: [null, [Validators.required]],
      theYearMonth: [null, [Validators.required]],
    });
    console.log(this.validateForm)
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getLineList(value: string): void {
    const params = {
      clrCenterNo: value,
      lineType: 2
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
      lineNos: this.validateForm.value.lineNo,
      theYearMonth : this.validateForm.value.theYearMonth.format('YYYY-MM'),
    };

    this.loading = true;
    this.service.generateLineRun(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `生成排班列表成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }
}

