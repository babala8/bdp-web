import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ServiceCenterService } from '../../service-center.service';
import { SYS_CONS } from 'app/models/constant';
import { AttributesAddComponent } from './../attr-add/attributes-add.component';

/**
 * @description 添加产品信息
 * @export
 * @class SkuAddComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './sku-add.component.html',
})
export class SkuAddComponent implements OnInit {
  validateForm: FormGroup;
  goodsNo;
  goodsName;
  upperGoodsNo;
  listOfData = [];
  GOODS_TYPE = SYS_CONS.GOODS_TYPE;
  isConfirmLoading = false;
  upperGoodsList = [];
  exampleObj = {
    '1': '下拉框型',
    '2': '手动输入数字型',
    '3': '手动输入字符串型',
    '4': '日期型',
    '5': '选择机构型'
  };

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private service: ServiceCenterService
  ) { }

  ngOnInit() {
    this.service.getUpperGoodsNo().subscribe(result => {
      this.upperGoodsList = result['retList'];
    });
    this.validateForm = this.fb.group({
      productNo: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      productType: [null]
    });
  }

  addAttributes() {
    this.modal.create({
      nzTitle: '添加属性',
      nzContent: AttributesAddComponent,
      nzWidth: 1024,
      nzZIndex: 199,
      nzFooter: null,
      nzOnOk: result => {
        // 根据属性名称对数组进行去重操作
        const arr = this.listOfData.map(item => {
          return item.propertyName;
        });
        if (arr.indexOf(result.goods.propertyName) === -1) {
          this.listOfData = [...this.listOfData, result.goods];
        } else {
          this.message.info('该属性名称已存在，添加失败!');
        }
      }
    });
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  handleOk() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i]) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.invalid) {
      return;
    }
    this.listOfData.forEach(item => {
      item.propertyValue = item.value.split(",")
    })
    const params = {
      ...this.validateForm.value,
      createTime: new Date().format('YYYY-MM-DD'),
      productPropertyKeyValueDTOList: this.listOfData
    };

    this.isConfirmLoading = true;
    this.service.addGoods(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false
    );
  }

  deleteAttributes(index) {
    this.listOfData.splice(index, 1);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
