import { BagInventoryCheckComponent } from './component/bag-inventory-check.component';
import { NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { OPERATETYPE } from '../../../models/constant';
import { ClearCenterService } from '../clear-center.service';

@Component({
  templateUrl: './bag-inventory.html',
  styles: [`
        input, nz-input-number {
            border-radius: 0;
        }
    `]
})
export class BagInventoryComponent implements OnInit {
  validateForm: FormGroup;
  initCashbox;
  cashboxList = [null];
  task;
  taskNo;
  detailList = [];
  current = 0;
  amount: number = 0;
  currencyTypeList= [];
  taskDetail;
  totalAmount = 0;
  sum = 0;
  loadingArr = [
    {
      loading: false
    },
    {},
    {
      loading: false
    },
    {}
  ];
  cashClass = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalService,
    private service: ClearCenterService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      cashbox: [null, [Validators.required]],
    });
    this.resetInfo();
  }

  // 重置详情表单信息
  resetInfo() {
    this.cashClass = [
      {
        currencyType: '1',
        name: '完整券',
        denomination: [
          { type: '1', name: '100元', value: 100, amount: null },
          { type: '2', name: '50元', value: 50, amount: null },
          { type: '3', name: '20元', value: 20, amount: null },
          { type: '4', name: '10元', value: 10, amount: null },
          { type: '5', name: '5元', value: 5, amount: null },
          { type: '6', name: '2元', value: 2, amount: null },
          { type: '7', name: '纸1元', value: 1, amount: null },
          { type: '8', name: '硬1元', value: 1, amount: null },
          { type: '9', name: '纸5角', value: 0.5, amount: null },
          { type: '10', name: '硬5角', value: 0.5, amount: null },
          { type: '11', name: '纸1角', value: 0.1, amount: null },
          { type: '12', name: '硬1角', value: 0.1, amount: null },
        ],
      },
      {
        currencyType: '3',
        name: '破损券',
        denomination: [
          { type: '1', name: '100元', value: 100, amount: null },
          { type: '2', name: '50元', value: 50, amount: null },
          { type: '3', name: '20元', value: 20, amount: null },
          { type: '4', name: '10元', value: 10, amount: null },
          { type: '5', name: '5元', value: 5, amount: null },
          { type: '6', name: '2元', value: 2, amount: null },
          { type: '7', name: '纸1元', value: 1, amount: null },
          { type: '8', name: '硬1元', value: 1, amount: null },
          { type: '9', name: '纸5角', value: 0.5, amount: null },
          { type: '10', name: '硬5角', value: 0.5, amount: null },
          { type: '11', name: '纸1角', value: 0.1, amount: null },
          { type: '12', name: '硬1角', value: 0.1, amount: null },
        ],
      },
    ];
    this.task = {};
    this.cashboxList = [];
    this.initCashbox = null;
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  // 确认清点
  inventory() {
    this.checkAmount();
    console.log(this.totalAmount, this.sum)
    if(this.totalAmount != this.sum) {

      this.message.warning('清点总金额与账务不匹配时,需重新进行清点!');
      return;
    }
    this.loadingArr[this.current].loading = true;
    const params: any = {};
    params.currencyTypeList = [];
    this.cashClass.forEach(item => {
      item.denomination.forEach(denomination => {
        if (!!denomination.amount) {
          params.currencyTypeList.push({
            currencyType: item.currencyType,
            currencyCode: '1',
            denomination: denomination.type,
            amount: denomination.amount * denomination.value,
          });
        }
      });
    });
    Object.assign(params, {operateType: OPERATETYPE.QingDian, customerNo: this.task.customerNo, taskNo: this.task.taskNo, taskType: this.task.taskType});
    console.log(params);
    this.service.inventory(params)
      .subscribe(() => {
        this.message.success('清点成功');
        this.loadingArr[this.current].loading = false;
        this.nextStep();

      }, () => {
        this.loadingArr[this.current].loading = false;
      });
  }

  nextStep() {
    if (this.current == 1 && this.sum == 0) {
      this.message.warning('请填写清点信息!');
      return;
    }
    this.current++;
  }

  backStep() {
    this.current--;
  }

  qryTaskDetail() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateForm.invalid) {
      return;
    }
    this.loadingArr[this.current].loading = true;
    this.service.qryTaskDetailByContainer({
      entityNo: this.initCashbox,
      productNo: 'R0003',
      // status: 309,
      operateType: 'QingDian'
    }).subscribe(res => {
      this.loadingArr[this.current].loading = false;
      this.task = res.element.retList[0];
      this.taskNo = this.task.taskNo;
      this.detailList = [
        { name: '任务单编号', value: this.task.taskNo },
        { name: '所属机构', value: this.task.customerName },
        { name: '解现日期', value: this.task.planFinishDate }
      ];
      this.cashboxList = res.element.retList[0].taskEntityPOList.filter(container => {
        if (container.entityNo === this.initCashbox) {
          container.checked = true;
        }
        return container.productNo === 'R0003'
      });
      if (this.cashboxList.length === 1) {
        this.current++;

      } else {
        this.cashboxCheck();
      }
    }, () => this.loadingArr[this.current].loading = false);

  }

  cashboxCheck() {
    this.modal.create({
      nzTitle: '箱包匹配',
      nzContent: BagInventoryCheckComponent,
      nzComponentParams: {
        task: this.task,
        cashboxList: this.cashboxList
      },
      nzWidth: 1280,
      nzZIndex: 99,
      nzClassName: 'zj-modal',
      nzFooter: null,
      nzOnOk: () => this.nextStep()
    });
  }

  get allCount() {
    let sum = 0;
    this.cashClass.forEach(item => {
      item.denomination.forEach(denomination => {
        if (!!denomination.amount) {
          sum += denomination.value * denomination.amount
        }
      });
    });
    this.sum=sum;
    return sum;
  }

  scan() {
    this.message.warning('未检测到扫描设备!');
  }

// 校验清点的金额是否于任务单详情金额相等
  checkAmount () {
    this.service.qryReceiptDetail(this.taskNo).subscribe(
      result => {
        this.amount  = 0;
        this.currencyTypeList = result.retList[0].taskDetailList;
        this.currencyTypeList.forEach( item => {
          this.amount += parseFloat(item.amount);
        });
        this.totalAmount = this.amount;
      },
    );
}

}
