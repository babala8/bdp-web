import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { CONTAINER_TYPE, SYS_CONS } from 'app/models/constant';
import { Page } from "app/models/page";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { ThingsService } from "../things.service";
import { CassetteBagAddComponent } from './add/cassetteBag-add.component';
import { CassetteBagModComponent } from './mod/cassetteBag-mod.component';

@Component({
  selector: 'app-cassette-bag',
  templateUrl: './cassette-bag.component.html',
})
export class CassetteBagComponent implements OnInit {
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;
  dataList = [];
  formModel = {};
  loading = true;
  page = new Page();
  constructor(
    private nzModal: NzModalService,
    private message: NzMessageService,
    private cassetteBagService: ThingsService
  ) { }

  ngOnInit() {
    this.refreshData(true);
    this.getProductAttribute()
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      containerNo: this.formModel['bag_no'] && this.formModel['bag_no'].trim() || '',
      status: this.formModel['cassette_bag_status'] || '',
      productNo: CONTAINER_TYPE.CASSETTE_BAG,
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    this.loading = true;
    this.cassetteBagService.qryContainerList(params)
      .subscribe(_data => {
        this.dataList = _data['retList'];
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
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

  openAdd() {
    this.nzModal.create({
      nzTitle: '添加钞袋信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '45%',
      nzZIndex: 990,
      nzContent: CassetteBagAddComponent,
      nzComponentParams: {
        attrList: this.attrList
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  openModify(item) {
    this.nzModal.create({
      nzTitle: '修改钞袋信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '45%',
      nzZIndex: 990,
      nzContent: CassetteBagModComponent,
      nzComponentParams: {
        cassetteBag: item,
        attrList: this.attrList
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  confirmDel(no) {
    this.cassetteBagService.delContainer(no)
      .subscribe(() => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  getProductAttribute() {
    this.attrList = [];
    this.cassetteBagService.getProductAttribute(CONTAINER_TYPE.CASSETTE_BAG)
      .subscribe(data => {
        this.attrList = data.productPropertyKeyValueDTOList.filter(ele => ele.propertyName.indexOf('编号') === -1)
      })
  }

  getPropertyValue(data, key) {
    const proerty = (data.containerPropertyList || []).find(p => p.key === key);
    if (!!proerty) {
      return proerty.value
    } else {
      return null;
    }
  }
}
