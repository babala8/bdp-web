import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS} from "../../../../../models/constant";
import { ThingsService } from "../../things.service";

@Component({
  selector: 'app-add-raeder',
  templateUrl: './add-reader.component.html'
})
export class AddReaderComponent implements OnInit {
  loading = false;
  rType = SYS_CONS.READER_TYPE;
  rStatus = SYS_CONS.READER_STATUS;
  validateForm: FormGroup;
  YON = [
    { no: 0, name: '无'},
    { no: 1, name: '有'}
  ]

  constructor(private fb: FormBuilder,
              private service: ThingsService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {

    this.validateForm = this.fb.group({
      clrCenterNo: [null, Validators.required],
      tagReaderNo:[null, [Validators.required, Validators.maxLength(32)]],
      status: [null, Validators.required],
      readerType: [null, Validators.required],
      location: [null, [Validators.maxLength(100)]],
      simNumberNo: [null, [Validators.pattern("0?(13|14|15|18)[0-9]{9}")]],
      note: [null, [Validators.maxLength(100)]],
      tmk: [null, [Validators.maxLength(48)]],
      gprsMonthlyFreeFlow: [null ],
      timingTaskInterval: [null ],
      gprsVolMinThreshold: [null ],
      gprsVolMaxThreshold: [null ],
      gprsVolOffset: [null ],
      gprsVolThreshold: [null ],
      whetherBarcodeModule: [0 ],
      whetherWifiModule: [0 ],
      whetherGprsModule: [0 ],
      whetherGpsModule: [0 ]

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
    const params = this.validateForm.value
    this.loading = true;
    this.service.addTagReader(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `添加成功！`,
      );

    })

  }
  isfIX() {
    if(this.validateForm.value.readerType === 1) {
      this.validateForm.patchValue({
        location: null,
      })

    }
  }
  isGPRS() {
    if(this.validateForm.value.whetherGprsModule === 0) {
      this.validateForm.patchValue({
        gprsMonthlyFreeFlow: null,
        timingTaskInterval: null,
        gprsVolMinThreshold: null,
        gprsVolMaxThreshold: null,
        gprsVolOffset: null,
        gprsVolThreshold: null,
      })

    }
  }
}
