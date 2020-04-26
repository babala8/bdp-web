import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS} from "../../../../../models/constant";
import { ThingsService } from "../../things.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-mod-raeder',
  templateUrl: './mod-reader.component.html'
})
export class ModReaderComponent implements OnInit {
  data;
  loading = false;
  rType = SYS_CONS.READER_TYPE;
  rStatus = SYS_CONS.READER_MOD_STATUS;
  validateForm;
  status;
  YON = [
    { no: 0, name: '无'},
    { no: 1, name: '有'}
  ];

  constructor(private fb: FormBuilder,
              private service: ThingsService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {
  }

  ngOnInit() {
    console.log(this.data);
    this.validateForm = this.fb.group({
      clrCenterNo: [this.data.clrCenterNo, Validators.required],
      tagReaderNo: [{value: this.data.tagReaderNo, disabled: true }, Validators.required],
      status: [this.data.status, Validators.required],
      readerType: [this.data.readerType, Validators.required],
      location: [this.data.location, [Validators.maxLength(100)]],
      simNumberNo: [this.data.simNumberNo, [Validators.pattern("0?(13|14|15|18)[0-9]{9}")]],
      note: [this.data.note ],
      tmk: [this.data.tmk, [Validators.maxLength(48)]],
      gprsMonthlyFreeFlow: [this.data.gprsMonthlyFreeFlow ],
      timingTaskInterval: [this.data.timingTaskInterval ],
      gprsVolMinThreshold: [this.data.gprsVolMinThreshold ],
      gprsVolMaxThreshold: [this.data.gprsVolMaxThreshold ],
      gprsVolOffset: [this.data.gprsVolOffset ],
      gprsVolThreshold: [this.data.gprsVolThreshold ],
      whetherBarcodeModule: [this.data.whetherBarcodeModule ],
      whetherWifiModule: [this.data.whetherWifiModule ],
      whetherGprsModule: [this.data.whetherGprsModule ],
      whetherGpsModule: [this.data.whetherGpsModule ]

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

    const params = _.extend({},this.validateForm.value, {tagReaderNo: this.data.tagReaderNo});
    this.loading = true;
    this.service.modTagReader(params).subscribe(data =>{
      this.loading = false;
      this.nzModal.triggerOk();
      this.message.success(
        `修改成功！`,
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
