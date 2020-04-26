import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import {SYS_CONS} from "../../../../../models/constant";
import {KeyService} from "../../key.service";

@Component({
  selector: 'app-mod-key-group',
  templateUrl: './mod-key-group.component.html'
})
export class ModKeyGroupComponent implements OnInit {
  data;
  validateForm;
  loading = false;
  kStatus = SYS_CONS.KEY_GROUP_STATUS

  constructor(private fb: FormBuilder,
              private service: KeyService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {


    this.validateForm = this.fb.group({
      clrCenterNo: [this.data.clrCenterNo, Validators.required],
      keyGroupNo: [{value:this.data.keyGroupNo, disabled:true}, Validators.required],
      keyGroupDesp: [this.data.keyGroupDesp],
      status: [this.data.status, Validators.required],
      note: [this.data.note ]
    });


  }

  getFormControl(name) {
    return this.validateForm.controls[name];
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
    const params = this.validateForm.value;
    params['keyGroupNo'] = this.data.keyGroupNo
    this.loading = true;
    this.service.modKeyGroup(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );

    })

  }
}
