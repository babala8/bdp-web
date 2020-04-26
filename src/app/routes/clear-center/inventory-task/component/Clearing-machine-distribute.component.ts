import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ClearCenterService } from '../../clear-center.service';
import { FormBuilder, Validators } from '@angular/forms';
import {OPERATETYPE} from "../../../../models/constant";

/**
 * 钞处中心 清分机分配
 */
@Component({
  selector: 'clearing-machine-distribute',
  templateUrl: './Clearing-machine-distribute.component.html',
  styles: [`
    a:hover {
      text-decoration: underline;
      color: #23527c;
    }
  `],
})
export class ClearingMachineDistributeComponent implements OnInit {
  taskList;
  formModel = {};
  dataSet = [];
  money = [];
  exampleObj = {
    '1': '启用',
    '2': '停用',
  };
  loading = false;
  isConfirmLoading = false;
  validateForm;

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private service: ClearCenterService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      batch:[null, Validators.required ],
    });
    console.log(this.taskList);
    this.getTaskMoney();
    this.getInventoryInfo();
  }


  getInventoryInfo() {
    this.service.getInventory().subscribe(_data => {
      this.dataSet = _data['retList'];
    });
  }

  _allChecked = false;
  _indeterminate = false;

  _refreshStatus(e, item) {
    console.log(item);
    this.dataSet.forEach(data => {
      data.checked = false;
    });
    item.checked = true;
  }

  _refresh() {
    const allChecked = this.money.every(value => value.checked === true);
    const allUnchecked = this.money.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnchecked);
  }

  postInventory() {

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }

    const arr1 = this.money.filter(item => {
      return item.checked;
    }).map(item => {
      return item.taskNo;
    });

    const arr2 = this.dataSet.filter(item1 => {
      return item1.checked;
    }).map(item1 => {
      return  item1.devNo;
    });

    if (arr2.length<=0)
      return this.message.warning('请选择清分机！');
    if (this.taskList.length<=0)
      return this.message.warning('无需要清分的计划！');

    const params = {
      batch: this.formModel['batch'],
      taskNoList : arr1,
      countStatus: 1,
      devNo: arr2[0]
    };
    console.log(params);
    this.service.distribute(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false,);

    const arr3 = this.money.filter(item => {
      return item.checked;
    }).map(item => {
      return item.taskNo;
    });

    const outWarehouseBatch = {
      'taskType': '2',
      'operateType': OPERATETYPE.FenPeiQingDian,
      'list': arr3,
    };
    this.service.outWarehouseBatch(outWarehouseBatch)
      .subscribe(data => {
        this.loading = false;
        this.message.success(
          `批量出库成功`,
        );
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  getTaskMoney(){
    this.service.getAtmInventory({taskNo:this.taskList}).subscribe(_data => {
      this.money = _data['retList'];
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
