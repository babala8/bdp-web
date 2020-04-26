import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {SYS_CONS} from "../../../../../models/constant";
import {KeyService} from "../../key.service";

@Component({
  templateUrl: './keyInfo-mod.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class KeyInfoModComponent implements OnInit {
  validateForm: FormGroup;
  loading = true;
  keyInfo;
  useRanges=SYS_CONS.AREA_TYPES;
  keyPropertys=SYS_CONS.KEY_PROPERTYS;
  keyStatus=SYS_CONS.KEY_STATUS;
  keyTypes=[];
  constructor(private fb: FormBuilder,
              private nzModal: NzModalRef,
              private message: NzMessageService,
              private keyService: KeyService,
  ) {
  }

  ngOnInit(): void {

    const params1=[];
    this.keyService.getKeyType(params1)
      .subscribe(data => {
        if (data['retCode'] === '00') {
          this.keyTypes = data['retList'];
        }
      });
    this.validateForm = this.fb.group({
      keyNo: [{value:this.keyInfo.keyNo,disabled:true}, [Validators.required]],
      clrCenterNo:[this.keyInfo.clrCenterNo, [Validators.required]],
      devNo:[this.keyInfo.devNo, null],
      keyDesp:[this.keyInfo.keyDesp, null],
      keyGroupNo:[this.keyInfo.keyGroupNo, null],
      keyProperty:[this.keyInfo.keyProperty, [Validators.required]],
      keyType:[this.keyInfo.keyType, [Validators.required]],
      netPointNo:[this.keyInfo.netPointNo, null],
      note:[this.keyInfo.note, null],
      status:[this.keyInfo.status, [Validators.required]],
      useRange:[this.keyInfo.useRange, [Validators.required]],
    });
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
    params['keyNo'] = this.keyInfo.keyNo;
    this.loading = true;
    this.keyService.modKeyInfo(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `提交成功！`,
      );

    })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
