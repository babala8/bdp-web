import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/core/session.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ServiceCenterService } from '../../service-center.service';
import { AttributesAddComponent } from './../attr-add/attributes-add.component';

/**
 * @description 修改产品信息
 * @export
 * @class SkuModComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './sku-mod.component.html',
})
export class SkuModComponent implements OnInit {
  editCache: { [key: string]: any } = {};
  goods;
  dataList = [];
  listOfData = [];
  upperGoodsList;
  loading = true;
  isConfirmLoading = false;
  valueList = [];
  fList = [
    { type: 1, name: '下拉框型' },
    { type: 2, name: '手动输入数字型' },
    { type: 3, name: '手动输入字符串型' },
    { type: 4, name: '日期型' },
    { type: 5, name: '选择机构型' }
  ];
  exampleObj = {
    '1': '下拉框型',
    '2': '手动输入数字型',
    '3': '手动输入字符串型',
    '4': '日期型',
    '5': '选择机构型'
  };

  constructor(
    private session: SessionService,
    private modal: NzModalService,
    private message: NzMessageService,
    private modalRef: NzModalRef,
    private service: ServiceCenterService,
  ) { }

  ngOnInit() {
    this.getData();
    this.service.getUpperGoodsNo().subscribe(result => {
      this.upperGoodsList = result['retList'];
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
        this.listOfData = [...this.listOfData, result.goods];
        this.dataList = [...this.dataList,
        {
          propertyNo: '',
          propertyName: result.goods.propertyName,
          propertyValue: result.goods.value,
          propertyType: result.goods.propertyType,
        },
        ];
        console.log( this.dataList)
        this.initEditCache(this.dataList);
      },
    });
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.dataList.findIndex(item => item.propertyNo === id);
    this.editCache[id] = {
      data: { ...this.dataList[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.dataList.findIndex(item => item.propertyNo === id);
    Object.assign(this.dataList[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.dataList.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  deleteEdit(id: string): void {
    this.dataList = this.dataList.filter(d => d.propertyNo !== id);
  }

  handleCancel() {
    this.modalRef.triggerCancel();
  }

  handleOk() {
    this.dataList.forEach(result => {
      if (typeof (result.propertyValue) === 'string') {
        result.propertyValue = result.propertyValue.split(',');
      }
    });
    const params = {
      productNo: this.goods.productNo,
      productName: this.goods.productName,
      productType: this.goods.productType,
      productPropertyKeyValueDTOList: this.dataList,
      createTime: this.goods.createTime,
      updateTime: new Date().format('YYYY-MM-DD'),
    };
    this.isConfirmLoading = true;
    this.service.modGoods(params).subscribe(
      res => {
        this.message.success(res.retMsg);
        this.modalRef.triggerOk();
      },
      () => this.isConfirmLoading = false,
    );
  }

  // 初始化editCache
  initEditCache(dataArr) {
    dataArr.forEach(data => {
      this.editCache[data.propertyNo] = {
        edit: false,
        data: { ...data },
      };
    });
  }

  getData() {
    this.service.qryGoodsDetail({ productNo: this.goods.productNo })
      .subscribe(_data => {
        this.dataList = _data['productPropertyKeyValueDTOList'];
        this.dataList.forEach(item => {
          item.propertyValue = item.propertyValueDetail.map(data => {
            return data.propertyValue
          })
        })
        this.initEditCache(this.dataList);
        this.loading = false;
      });
  }

  change(data) {
    this.editCache[data.propertyNo].data.propertyValue = ''
  }
}
