import {Component, OnInit} from '@angular/core';
import {ClearCenterService } from '../../clear-center.service';
import {NzMessageService, NzModalRef} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-allocation-task-branch.detail',
  templateUrl: './allocation-task-branch.html',
})
export class SorterDistributeComponent implements OnInit {

  data;
  data2 = [];
  dataSet = [];
  devList = [];
  formModel = {};
  taskNoList = [];
  devSelected;
  loading = false;
  validateForm: FormGroup;
  valueObservable$ = new Subject();

  constructor(
    private nzModal: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private allocationTaskManageService: ClearCenterService,
  ) { }

  ngOnInit() {

    this.getTaskNoAndAmount();
    this.getCountTaskNum();

    this.validateForm = this.fb.group({
      batch: [null, Validators.required],
    });
  }

  // 查询任务单对应的金额
  getTaskNoAndAmount(){
    this.loading = true;
    this.allocationTaskManageService.getAmountByTaskNo({taskNo: this.data}).subscribe(_date => {
      this.dataSet = _date['retList'];
      console.log(this.dataSet);
      this.dataSet.forEach(item => {
        this.taskNoList.push(item['taskNo']);
        this.data2.push({taskNo: item['taskNo']});
      })
    });
  }

  // 查询清分机列表
  getCountTaskNum(){
    this.allocationTaskManageService.qryCountTaskNum().subscribe(_data => {
      this.devList = _data['retList'];
    })
  }

  // 清分机分配
  clearDevDistribute(){
    // 表单验证
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }

    if (this.devSelected === undefined || this.devSelected.checked === false) {
      return this.message.warning('请选择清分机!');
    }

    // 批量出库
    this.outWarehouse(this.taskNoList);
    // 批量出库成功后对清分机进行分配
    (this.valueObservable$ as Observable<any>).subscribe(data => {
      console.log(data);
      if (data) {
        // 清分机分配
        this.clearDevDistributeFunc();
      }
    });

  }

  // 清分机单选功能
  _refreshStatus(event, item){
    this.devSelected && this.devSelected !== item && (this.devSelected.checked = false);
    // this.devSelected ? this.devSelected.checked = false: '';
    this.devSelected = item;
    console.log(this.devSelected);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  // 批量出库
  outWarehouse(taskNoList) {
    const outWarehouseBatch = {
      "taskType": 4,
      "operateType": "FenPeiPeiKuan",
      "list": taskNoList
    };
    this.allocationTaskManageService.outWarehouseBatch(outWarehouseBatch)
      .subscribe(data => {
        this.loading = false;
        this.message.success(
          `批量出库成功`,
        );
        this.valueObservable$.next(true);
      }, (error) => {
        this.loading = false;
        this.valueObservable$.next(false);
      });
  }

  // 清分机分配
  clearDevDistributeFunc() {
    const param = {
      batch: this.formModel['batch'],
      countStatus: 1,
      devNo: this.devSelected['devNo'],
      taskNoList: this.taskNoList,
    };
    this.allocationTaskManageService.clearDevDistribute(param).subscribe(data => {
      this.loading = false;
      this.message.success(`分配成功` );
      this.valueObservable$.unsubscribe();
      this.nzModal.triggerOk();
    },(error => {
      this.loading = false;
    }))
  }
}
