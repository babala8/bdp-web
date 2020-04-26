import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SYS_CONS } from '../../../../models/constant';

@Component({
  selector: 'app-detail-securityWarn',
  templateUrl: './detail.component.html',
  styles: [`
        form>div {
            padding: 8px 0;
        }
    `]
})
export class DetailComponent implements OnInit {
  validateForm;
  loading = false;
  data;

  warnTypes  = SYS_CONS.SECURITY_WARN_TYPE;

  constructor(private fb: FormBuilder) {
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
      warnMessageHandleUserNo: [{value:this.data.warnMessageHandleUserNo, disabled: true}],
      warnMessageHandleUserName: [{value:this.data.warnMessageHandleUserName, disabled: true}],
      warnMessageHandleDate: [{value:this.data.warnMessageHandleDate, disabled: true}],
      warnMessageHandleResult: [{value:this.data.warnMessageHandleResult, disabled: true}],
      warnMessageDetailInfo: [{value:this.data.warnMessageDetailInfo, disabled: true}],
    });

  }
 
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
