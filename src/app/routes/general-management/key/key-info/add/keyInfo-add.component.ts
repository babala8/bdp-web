import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {SYS_CONS} from "../../../../../models/constant";
import {KeyService} from "../../key.service";

@Component({
  templateUrl: './keyInfo-add.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `]
})

export class KeyInfoAddComponent implements OnInit {
  useRanges=SYS_CONS.AREA_TYPES;
  keyPropertys=SYS_CONS.KEY_PROPERTYS;
  keyStatus=SYS_CONS.KEY_STATUS;
  keyTypes=[];
  validateForm: FormGroup;
  loading = true;
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
      keyNo: [null, Validators.required],
      clrCenterNo: [null, Validators.required],
      keyDesp: [null, null],
      useRange:[null, Validators.required],
      keyType:[null, Validators.required],
      keyGroupNo:[null, null],
      netPointNo:[null, null],
      devNo:[null, null],
      keyProperty:[null, Validators.required],
      status:[null, Validators.required],
      note:[null, null],
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
    this.loading = true;
    this.keyService.addKeyInfo(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })

  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
