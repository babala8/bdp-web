import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ServiceCenterService } from '../../service-center.service';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 服务中添加物品类型
 * @export
 * @class ProductAddComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit {
  productList = [];   // 物品列表
  productPropertyList: any = [];  // 选中某个确定产品的详情
  directionList = [
    { label: '调入', value: 1 },
    { label: '调出', value: 2 }
  ];
  productInfo: any = {};    // 处理后的product
  productListObj: any = {};   // 提前处理，用来简化属性名称获取
  loading = false;
  constructor(
    private serviceManageService: ServiceManageService,
    private modalRef: NzModalRef) { }
  ngOnInit(): void {
    this.qryProductList();
  }

  // 查询所有物品列表
  qryProductList() {
    this.serviceManageService.qryProductList({})
      .subscribe(result => {
        this.productList = result['retList'];
        this.productList = result['retList'].filter(item => {
          return item.productNo !== 'R' && item.productNo !== 'X';
        });
        result['retList'].forEach(item => {
          this.productListObj[item.productNo] = item.productName;
        })
      })
  }

  // 属性选中变化
  propertyValueChange(e, index) {
    this.productPropertyList[index]['propertyValueDetailList'] = e;
  }

  // 变更物品信息
  productChange(e) {
    this.productPropertyList = [];
    this.productInfo['productNo'] = e;
    this.productInfo['productName'] = this.productListObj[e];
    // 查询物品的属性信息
    this.serviceManageService.qryProductDetail({ productNo: e })
      .subscribe(result => {
        this.productPropertyList = result['productPropertyKeyValueDTOList'];
      })
  }

  submitChanges() {
    this.productInfo['propertyValueDetailList'] = [];
    this.productPropertyList.forEach(productProperty => {
      if (productProperty.propertyValueDetailList && productProperty.propertyValueDetailList.length !== 0) {
        productProperty.propertyValueDetailList.forEach(property => {
          this.productInfo['propertyValueDetailList'].push(property);
        })
      }
    });
    // this.productInfo['propertyList'] = JSON.stringify(this.productPropertyList.map(item => {
    //   return { [item.propertyName]: item.propertySelectedList || [] }
    // }));
    // this.productInfo['propertyValueDetailList'] = [];
    // if (this.productPropertyList && this.productPropertyList.length !== 0) {
    //   this.productPropertyList.forEach(productProperty => {
    //     if (productProperty.propertySelectedList && productProperty.propertySelectedList !== 0) {
    //       productProperty.propertySelectedList.forEach(property => {
    //         this.productInfo['propertyValueDetailList'].push(property.id);
    //       })
    //     }
    //   });
    // }
    this.modalRef.triggerOk();
  }
}
