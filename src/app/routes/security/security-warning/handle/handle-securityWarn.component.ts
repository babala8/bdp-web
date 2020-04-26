import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS } from '../../../../models/constant';
import { SecurityWarningService } from '../security-warning.service';

@Component({
  selector: 'app-handle-securityWarn',
  templateUrl: './handle-securityWarn.component.html',
  styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class HandleSecurityWarnComponent implements OnInit {
  validateForm;
  loading = false;
  data;
  useList;
  warnTypes  = SYS_CONS.SECURITY_WARN_TYPE;

  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private service: SecurityWarningService) {
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      warnMessageId: [{value:this.data.warnMessageId, disabled: true}],
      warnMessageType: [{value:this.data.warnMessageType, disabled: true}],
      warnMessageInfo: [{value:this.data.warnMessageInfo, disabled: true}],
      warnMessageDate: [{value:this.data.warnMessageDate, disabled: true}],
      warnMessageTime: [{value:this.data.warnMessageTime, disabled: true}],
      warnMessageToUserNo: [{value:this.data.warnMessageToUserNo, disabled: true}],
      warnMessageToRoleNo: [{value:this.data.warnMessageToRoleNo, disabled: true}],
      warnMessageHandleStatus: [{value:this.data.warnMessageHandleStatus, disabled: true}],
      warnMessageHandleUserNo: [null,Validators.required],
      warnMessageHandleUserName: [{value:this.data.warnMessageHandleUserName, disabled: true}],
      warnMessageHandleDate: [null,Validators.required],
      warnMessageHandleResult:[null,Validators.required],
      warnMessageDetailInfo: [{value:this.data.warnMessageDetailInfo, disabled: true}],
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
  _submitForm(){
    for (const i in this.validateForm.controls) {
      console.log(this.validateForm.controls[i])
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.nzModal.triggerOk()
  }
}
