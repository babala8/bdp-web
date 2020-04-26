import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import * as _ from'lodash';
import {SYS_CONS} from "../../../../../../models/constant";
import {KeyService} from "../../../key.service";

@Component({
  selector: 'app-mod-key',
  templateUrl: './mod-key.component.html'
})
export class ModKeyComponent implements OnInit {
  data;
  validateForm;
  loading = false;
  range = SYS_CONS.KEY_RANGE;

  constructor(private fb: FormBuilder,
              private keyTypeService: KeyService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clrCenterNo: [this.data.clrCenterNo, Validators.required],
      keyUseRange: [this.data.keyUseRange, Validators.required],
      keyTypeName: [this.data.keyTypeName, Validators.required],
      keyTypeNo: [{value:this.data.keyTypeNo,disabled:true}, Validators.required],
      note: [this.data.note],
      id: [this.data.id]
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
      keyTypeNo:this.data.keyTypeNo
    });
    this.loading = true;
    this.keyTypeService.modKeyType(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
      );

    })

  }
}
