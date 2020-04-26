import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ApplyGoodsAddComponent } from './goods-add/apply-goods-add.component';
import { CommonService } from '../../common.service';

@Component({
  templateUrl: './apply-add.component.html',
})
export class ApplyAddComponent implements OnInit {
  serviceDetail;
  loading = false;
  addForm: any = {};
  goodsList = [];
  goodsGroup: any = [];

  constructor(private modalRef: NzModalRef,
              private modal: NzModalService,
              private message: NzMessageService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    console.log(this.serviceDetail);
  }

  // 打开添加任务单物品详情界面
  openAddGoods() {
    this.modal.create({
      nzTitle: '填写物品信息',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ApplyGoodsAddComponent,
      nzZIndex: 200,
      nzComponentParams: {
        serviceNo: this.serviceDetail.serviceNo,
      },
      nzOnOk: result => {
        this.addGoods(result.paramsList);
      },
      nzOnCancel: () => {
      },
    });
  }

  // 新增物品信息
  addGoods(goodsInfo) {
    this.goodsList = [...this.goodsList, goodsInfo];
    console.log(this.goodsList);
    const goodsMap = new Map();
    this.goodsList.forEach((item, index) => {
      item.index = index;
      if (goodsMap.get(item.goodsType)) {
        goodsMap.get(item.goodsType).push(item);
      } else {
        goodsMap.set(item.goodsType, [item]);
      }
    });
    this.goodsGroup = [];
    goodsMap.forEach((value, key, map) => {
      this.goodsGroup.push(value);
    });
    console.log(this.goodsGroup);
    this.goodsGroup.forEach(group => {
      group.forEach(params => {
        params.dataDetail = params.map(item => {
          return {name: item.parameterName, value: item.value}
        });
      });
    });
    console.log(this.goodsGroup);
  }
  // 删除物品信息
  deleteGoods(i) {
    this.goodsList.splice(i, 1);
    this.goodsList = [...this.goodsList];
    const goodsMap = new Map();
    this.goodsList.forEach((item, index) => {
      item.index = index;
      if (goodsMap.get(item.goodsType)) {
        goodsMap.get(item.goodsType).push(item);
      } else {
        goodsMap.set(item.goodsType, [item]);
      }
    });
    this.goodsGroup = [];
    goodsMap.forEach((value, key, map) => {
      this.goodsGroup.push(value);
    });
    console.log(this.goodsGroup);
    this.goodsGroup.forEach(group => {
      group.forEach(params => {
        params.dataDetail = params.map(item => {
          return {name: item.parameterName, value: item.value}
        });
      });
    });
  }


  // 添加任务单
  submitApply() {
    // 这里物品信息需要处理，因为这时候物品信息是一个数组，要处理成对象的形式
    const goodsCopy = this.goodsList.map(goods => {
      const goodsInfoCopy = {};
      goods.forEach(params => {
        goodsInfoCopy[params.parameter] = params.value;
      });
      return goodsInfoCopy;
    });
    const params = {
      ...this.addForm,
      planFinishDate: this.addForm['planFinishDate'].format('YYYY-MM-DD'),
      taskType: this.serviceDetail.serviceNo,
      customerType: this.serviceDetail.customerType,
      transferTaskDetailDTO: goodsCopy,
    };
    console.log(this.addForm);
    if (this.serviceDetail.customerType == 3) {
      Object.assign(params, {customerNo: this.addForm['customer'].no});
    }
    console.log(params);
    this.loading = true;
    this.commonService.addCommonApply(params)
      .subscribe(result => {
        this.loading = false;
        this.message.success('添加申请单成功');
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      });
  }

  cancel() {
    this.modalRef.triggerCancel();
  }
}
