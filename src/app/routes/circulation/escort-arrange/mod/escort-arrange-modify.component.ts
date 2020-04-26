import { Component, OnInit } from '@angular/core';
import { CirculationService } from '../../circulation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';

@Component({
  templateUrl: './escort-arrange-modify.html',
})

export class EscortArrangeModifyComponent implements OnInit {
  validateForm: FormGroup;
  escortInfo;
  loading = false;
  carList = [];
  lineList = [];
  outSourcingList = [];
  constructor(private fb: FormBuilder,
              private service: CirculationService,
              private nzModal: NzModalRef,
              private message: NzMessageService) {

  }

  ngOnInit() {
    console.log(this.escortInfo)
    this.validateForm = this.fb.group({
      lineName: [{ value: this.escortInfo.lineName, disabled: true }, [Validators.required]],
      dutyDate: [{ value: this.escortInfo.dutyDate, disabled: true }, [Validators.required]],
      carNo: [this.escortInfo.carNo, [Validators.required]],
      outSourcingArr: [this.escortInfo.outSourcingArr, [Validators.required]]
    });

    this.getInfoList();
  }
  getLineList(value){
    const params = {
      clrCenterNo: value
    };
    this.service.qryAllLine(params)
      .subscribe(_data => {
        this.lineList = _data.retList;
      });
  }
  getInfoList(){
    // TODO 修改接口 获取所有列表信息 当前使用分页接口代替
    const params = {
      curPage: 1,
      pageSize: 9999
    }
    this.service.getOutSourcingList(params)
      .subscribe(data => {
        this.outSourcingList = data['retList'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
    this.service.geCarList(params)
      .subscribe(data => {
        this.carList = data['retList'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }


  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    let obj = [];
    this.validateForm.value.outSourcingArr.forEach(el =>{
      obj.push({no:el})
    })
    let params = Object.assign(this.escortInfo,{
      carNo: this.validateForm.value.carNo,
      outsourcingList: obj
    })
    delete params.outSourcingArr
    delete params.outSourcingName

    this.loading = true;
    this.service.modEscort(params)
      .subscribe(data => {
        this.loading = false;
        this.nzModal.triggerOk();
        this.message.success(
          `修改排班信息成功！`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

}
