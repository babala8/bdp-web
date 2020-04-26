import { Component, OnInit } from '@angular/core';
import { SYS_CONS } from '../../../../models/constant';
import { FormBuilder, Validators } from '@angular/forms';
import { CirculationService } from '../../circulation.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-return-raeder',
  templateUrl: './handhelds-receive-return.component.html'
})

export class HandheldsReceiveReturnComponent implements OnInit {
  data;
  validateForm;
  loading = false;
  formModel = {};
  cFlag = SYS_CONS.CRASH_FLAG;
  useList;
  constructor(private fb: FormBuilder,
              private service: CirculationService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {


    this.validateForm = this.fb.group({
      tagReaderNo: [{value:this.data.tagReaderNo,disabled: true}, Validators.required],
      requestOpName: [{value: this.data.requestOpName,disabled: true}, Validators.required],
      grantOpName: [{value: this.data.grantOpName,disabled: true}, Validators.required],
      requestDate: [{value: this.data.requestDate,disabled: true}, Validators.required],
      requestTime: [{value: this.data.requestTime,disabled: true}, Validators.required],
      crashFlag: [{value: this.data.crashFlag,disabled: true}, Validators.required],
      returnOpNo: [null, Validators.required],
      signOpNo: [null, Validators.required]
    });

    // 获用户列表
    this.service.getUser({
      curPage: 1,//当前页码
      pageSize: 9999,//每页条数
    }).subscribe( data => {
      this.useList = data.retList;
    })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
  _submitForm() {
    // const params = _.extend({},this.validateForm.value,{
    //   tagreaderUseNo:this.data.tagreaderUseNo,
    //   tagReaderNo:this.data.tagReaderNo
    // })

    //轻量传输,只传需要的参数

    const params={
      tagReaderNo: this.data.tagReaderNo,
      tagReaderUseNo: this.data.tagReaderUseNo,
      returnOpNo: this.validateForm.value.returnOpNo,
      signOpNo: this.validateForm.value.signOpNo
    };

    this.loading = true;
    this.service.returnReaderFlow(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `归还成功！`,
      );
    }, (error) => {
      this.loading = false;
      if (error instanceof HttpResponse) {
        this.message.error(error.body.retMsg);
      }
    })

  }

}
