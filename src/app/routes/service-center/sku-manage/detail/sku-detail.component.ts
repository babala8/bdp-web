import { Component, OnInit } from '@angular/core';
import { ServiceCenterService } from '../../service-center.service';

/**
 * @description 查看产品详细信息
 * @export
 * @class SkuDetailComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './sku-detail.component.html'
})
export class SkuDetailComponent implements OnInit {
  item;
  goods;
  detailList;
  loading = true;
  dataList = [];
  upperGoodsList = [];
  exampleObj = {
    '1': '下拉框型',
    '2': '手动输入数字型',
    '3': '手动输入字符串型',
    '4': '日期型',
    '5': '选择机构型'
  };
  constructor(private service: ServiceCenterService) {
  }

  ngOnInit() {
    this.getData()
    this.service.getUpperGoodsNo().subscribe(result => {
      this.upperGoodsList = result['retList'];
      this.detailList = [
        {
          name: '产品编号',
          value: this.goods.productNo
        },
        {
          name: '产品名称',
          value: this.goods.productName
        },
        {
          name: '所属分类',
          value: this.goods.productType === null ? '' : this.upperGoodsList.find(item => item.productNo == this.goods.productType).productName
        },
      ];
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
        this.loading = false;
      })
  }
}
