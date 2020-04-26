import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Page } from './../../../models/page';
import { ServiceCenterService } from './../service-center.service';
import { SkuDetailComponent } from './detail/sku-detail.component';
import { SkuAddComponent } from './sku-add/sku-add.component';
import { SkuModComponent } from './sku-mod/sku-mod.component';

/**
 * @name 产品管理
 * @description 产品分页查询
 * @export
 * @class SkuManageComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './sku-manage.component.html',
})
export class SkuManageComponent implements OnInit {
  formModel = {};
  dataList = [];
  loading = true;
  page = new Page();
  upperGoodsList = [];

  constructor(
    private service: ServiceCenterService,
    private modal: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.refreshData(true);
    this.service.getUpperGoodsNo().subscribe(result => {
      this.upperGoodsList = result['retList'];
    });
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    this.loading = true;
    const params = {
      productNo: this.formModel['productNo'] || '',
      productName: this.formModel['productName'] || '',
      productType: this.formModel['productType'] || '',
    };

    // 获取当前页
    this.service.qryGoodsList(params)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.loading = false;
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  search() {
    this.refreshData(true);
  }

  openDetail(item) {
    this.modal.create({
      nzTitle: '产品信息详情',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: SkuDetailComponent,
      nzWidth: '80%',
      nzComponentParams: {
        goods: item
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });

  }

  openModify(item) {
    this.modal.create({
      nzTitle: '修改产品',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '80%',
      nzContent: SkuModComponent,
      nzComponentParams: {
        goods: item
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(no) {
    this.service.deleteGoods(no)
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData();
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  openAdd() {
    this.modal.create({
      nzTitle: '添加产品分类',
      nzMaskClosable: false,
      nzFooter: null,
      nzContent: SkuAddComponent,
      nzWidth: '80%',
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }
}
