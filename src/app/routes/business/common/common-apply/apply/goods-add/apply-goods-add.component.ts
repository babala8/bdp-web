import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { CommonService } from '../../../common.service';

@Component({
  templateUrl: './apply-goods-add.component.html',
})
export class ApplyGoodsAddComponent implements OnInit {
  serviceNo;
  paramsList: any = [];
  productDetail;    //  当前页面选中的物品详情
  productList = [];

  constructor(private commonService: CommonService,
              private modalRef: NzModalRef) {
  }

  ngOnInit(): void {
    this.qryParamsByProduct();
  };

  // 转换关系

  // 查询添加一个物品信息需要填的参数
  qryParamsByProduct() {
    this.commonService.qryServiceDetail(this.serviceNo)
      .subscribe(result => {
        this.productList = result['productList'];
      });
  }

  // 选中物品之后添加属性
  selectProduct(e) {
    this.productDetail = e;
    this.paramsList = e.selfProductGoodsArgumentDTOList;
    this.paramsList.forEach(params => {
      params.dataType = params.parameterType ? params.parameterType.toLowerCase() : '';
    });
    console.log(this.paramsList);
  }

  // 确认添加信息
  submitProduct() {
    console.log(this.productDetail);
    if (!this.productDetail) {
      return;
    }
    this.paramsList.forEach(params => {
      if (params.dataType == 'date') {
        params.value = params.value ? params.value.format('YYYY-MM-DD') : '';
      }
    });
    this.paramsList.goodsType = this.productDetail.goodsNo;
    this.paramsList.goodsName = this.productDetail.goodsName;
    console.log(this.paramsList);
    this.modalRef.triggerOk();
  }
}
