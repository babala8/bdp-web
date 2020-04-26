import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { SYS_CONS } from 'app/models/constant';
/**
 * @description 添加产品属性
 * @export
 * @class AttributesAddComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: 'attributes-add.component.html'
})
export class AttributesAddComponent implements OnInit {
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  goods: any = {
    propertyName: null,
    value: null,
    propertyValue: {} = {},
  };
  fList = [
    { type: 1, name: '下拉框型' },
    { type: 2, name: '手动输入数字型' },
    { type: 3, name: '手动输入字符串型' },
    { type: 4, name: '日期型' },
    { type: 5, name: '选择机构型' }
  ];
  constructor(private modalRef: NzModalRef) { }

  ngOnInit() { }

  handleCancel() {
    this.modalRef.destroy();
  }

  handleOk() {
    this.modalRef.triggerOk();
  }

  change() {
    this.goods.value = '';
  }
}
