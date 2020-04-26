import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ThingsService } from "../../things.service";
import * as _ from 'lodash';
import {SYS_CONS} from "../../../../../models/constant";
import { log } from 'util';

@Component({
  selector: 'app-mod-tag',
  templateUrl: './mod-tag.component.html'
})
export class ModTagComponent implements OnInit {
  data;
  validateForm;
  loading = false;
  tType = SYS_CONS.TAG_TYPE;
  tStatus = SYS_CONS.TAG_STATUS;

  constructor(private fb: FormBuilder,
              private service: ThingsService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [this.data.clrCenterNo, Validators.required],
      tagTid: [{value:this.data.tagTid,disabled:true}, Validators.required],
      tagType: [this.data.tagType, Validators.required],
      status: [this.data.status, Validators.required],
      note: [this.data.note ],
      epcInfo: [this.data.epcInfo ],
      epcMemorySize: [this.data.epcMemorySize ],
      userdataMemorySize: [this.data.userdataMemorySize ],
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
    const params = _.extend({},this.validateForm.value,{
      tagTid:this.data.tagTid
    });
    this.loading = true;
    this.service.modTag(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );

    })

  }
}
