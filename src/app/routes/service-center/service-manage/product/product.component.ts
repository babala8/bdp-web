import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/routes/common.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ServiceManageService } from '../service-manage.service';

/**
 * @description 服务中的物品类型管理
 * @export
 * @class ProductComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  serviceInfo;
  serviceInfoDetail: any = {};
  productList = [];
  loading = false;
  constructor(
    private modal: NzModalService,
    private serviceManageService: ServiceManageService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  // 查询服务详情
  initData(): void {
    this.serviceManageService.getServiceDetail(this.serviceInfo.serviceNo)
      .subscribe(result => {
        this.serviceInfoDetail = result;
        this.productList = result['productList'];
      });
  }

  // 打开添加物品详情界面
  openDetailAdd() {
    this.modal.create({
      nzTitle: '物品属性管理',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: ProductAddComponent,
      nzOnOk: result => {
        this.changeGoods(result);
      },
      nzOnCancel: () => {
      },
    })
  }

  // 删除物品信息
  deleteGoods(i) {
    this.productList.splice(i, 1);
    this.productList = [...this.productList];
  }

  // 变更物品信息
  changeGoods(result) {
    this.productList.push(result.productInfo);
    this.productList = [...this.productList];
  }

  //  提交物品信息变更
  submitChanges() {
    // serviceProductDTOs
    this.productList.forEach(item => {
      item.propertyList = [];
      item.serviceNo = this.serviceInfoDetail.serviceNo;
      if (item.propertyValueDetailList && item.propertyValueDetailList.length !==0) {
        item.propertyValueDetailList.forEach(propertyValue => {
          item.propertyList.push(propertyValue.id);
        })
      }
    });
    this.loading = true;
    this.serviceManageService.ServiceProductManage(this.productList)
      .subscribe(result => {
        this.loading = false;
        this.message.success('修改物品信息成功');
        this.modalRef.triggerOk();
      }, err => {
        this.loading = false;
      });
  }
}
