import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WebsocketService } from "@core";
import { OPERATETYPE, SYS_CONS } from 'app/models/constant';
import { NzMessageService } from "ng-zorro-antd";
import { Subscription } from "rxjs";
import { StorageCenterService } from './../storage-center.service';

/** 门禁审核入库 */
@Component({
  templateUrl: './security-access-check-in.component.html',
})
export class SecurityAccessCheckInComponent implements OnInit {

  formModel = {};
  taskType = SYS_CONS.TASK_TYPE;
  data = {
    entityNo: '',
    productNo: 'R0003',
    operateType: OPERATETYPE.MenJinShenHeRuKu
  };
  context;
  loading = false;
  result;
  dataList: any = {};
  customerNoList = [];
  entityNoList = [];
  scanEntityNoList = []; // 通过扫描获取到的所有款箱列表
  isAllMatch = true; // 扫描到的款箱与任务单款箱是否完全匹配
  wsObservable: Subscription;
  validateForm: FormGroup;

  constructor(private message: NzMessageService,
              private fb: FormBuilder,
              private service: StorageCenterService,
              private ws: WebsocketService
  ) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      clrCenterNo: [null, [Validators.required]],
      shelfNo: [null, [Validators.required]]
    });
    // 接收推送数据
    this.wsObservable = this.ws.change.subscribe(data => {
      if (data.type === 'MenJinShenHeRuKu') {
        console.log(data);
        // 获取扫描到的所有款箱
        this.scanEntityNoList = data['goods'];
        // 获取扫描到的款箱中的第一个款箱编号
        this.data['entityNo'] = data['goods'][0];
        this.getCompareResult(this.data);
      }
    });

  }

  // 获取匹配结果
  getCompareResult(data) {
    this.loading = true;
    this.service.getMatchResult(data)
      .subscribe(_data => {
        this.loading = false;
        this.result = _data['element'];
        this.dataList = this.result['retList'][0];
        // 取retList中第一条数据 element
        this.context = [
          {
            name: '任务单编号',
            value: this.dataList['taskNo']
          },
          {
            name: '所属金库',
            value: this.dataList['clrCenterName']
          },
          {
            name: '所属机构',
            value: this.dataList['customerName']
          }
        ];

        // 获取dataList中的customerNoList，取其中第一条数据，再取其中的entityNoList显示
        this.entityNoList = this.dataList['taskEntityPOList'].filter(entity => {
          return !entity.parentEntity;
        });
        // this.entityNoList = this.customerNoList['entityNoList'];

        this.compareContainer(this.scanEntityNoList);
      }, err => {
        this.loading = false;
      })
  }

  // 比较物品
  compareContainer(entityNos) {
    this.isAllMatch = true;
    this.entityNoList.forEach(_container => {
      entityNos.forEach(entityNo => {
        if (_container.entityNo === entityNo) {
          if (!_container.matchFlag) {
            _container.matchFlag = true;
          }
        }
      });
      // 如果有一个款箱不匹配
      if (!_container.matchFlag) {
        this.isAllMatch = false;
      }
    });
  }

  // 入库
  goodInWithShelf(){

    const noList = this.entityNoList.map(item => {
      return item['entityNo'];
    });
    if (noList.length <= 0){
      this.message.warning("当前扫描信息为空，请先进行扫描操作!");
      return;
    }

    // 校验用户输入
    console.log(this.validateForm);
    for (const i in this.validateForm.controls){
      if (this.validateForm.controls[i]){
        this.validateForm.controls[i].markAsDirty();
      }
    }
    if (this.validateForm.invalid){
      return;
    }

    // 校验扫描到的款箱是否和任务单中的款箱完全匹配
    if (this.scanEntityNoList.length != this.entityNoList.length) {
      this.message.warning("扫描到的款箱数量与该任务单款箱数量不匹配，请重新扫描!");
      return;
    }else if (!this.isAllMatch) {
      this.message.warning("存在不匹配款箱，请重新扫描!");
      return;
    }

    const inWarehouseParams = {
      taskNo: this.dataList.taskNo,
      taskType: this.dataList.taskType,
      operateType: OPERATETYPE.MenJinShenHeRuKu,
      clrCenterNo: this.formModel['clrCenterNo'],
      shelfNo: this.formModel['shelfNo'],
      entityNos: noList,
    };
    console.log(inWarehouseParams);
    this.service.goodInWithShelf(inWarehouseParams)
      .subscribe(data => {
        this.loading = false;
        this.message.success(
          `入库成功`,
        );
        this.refreshDate();
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

  refreshDate(){
    this.context = [];
    this.entityNoList = [];
    this.formModel = {};
    this.validateForm.reset();
    // 关闭脏校验
    for (const j in this.validateForm.controls){
      this.validateForm.controls[j].markAsPristine();
      this.validateForm.controls[j].updateValueAndValidity();
    }
  }
}
