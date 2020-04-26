import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONTAINER_TYPE, SYS_CONS } from 'app/models/constant';
import { Page } from "app/models/page";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ThingsService } from "../things.service";
import { CashboxAddComponent } from './add/cashbox-add.component';
import { CassetteModComponent } from './mod/cassette-mod.component';

@Component({
  templateUrl: './cashbox-info.component.html',
})
export class CashboxInfoComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();
  attrList = [];
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private modal: NzModalService,
    private message: NzMessageService,
    private service: ThingsService) {
  }

  ngOnInit() {
    this.reset();
    this.service.getProductAttribute(CONTAINER_TYPE.CASHBOX).subscribe(res => {
      this.attrList = res.productPropertyKeyValueDTOList.filter(ele => ele.propertyName.indexOf('编号') === -1)
    })
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const params = {
      customerNo: this.formModel['customerNo'] == null ? '' : this.formModel['customerNo'].no,
      containerNo: this.formModel['entityNo'] || '',
      status: this.formModel['status'] || '',
      productNo: CONTAINER_TYPE.CASHBOX,
      curPage: this.page.curPage,
      pageSize: this.page.pageSize,
    };
    this.loading = true;
    this.service.qryContainerList(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.page.totalRow = _data['totalRow'];
        this.page.totalPage = _data['totalPage'];
      }, (error) => {
        this.loading = false;
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  reset() {
    if (this.formModel['customerNo'] != null) {
      this.formModel['customerNo'].name = '';
      this.formModel['customerNo'].no = '';
    }
    this.formModel['entityNo'] = null;
    this.formModel['status'] = null;
    this.refreshData(true);
  }

  openAdd() {
    this.modal.create({
      nzTitle: '添加款箱',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: CashboxAddComponent,
      nzComponentParams: {
        attrList: this.attrList
      },
      nzOnOk: () => {
        this.refreshData(false);
      },
      nzOnCancel: () => {
      },
    });
  }

  openMod(item) {
    this.modal.create({
      nzTitle: '修改款箱信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: CassetteModComponent,
      nzComponentParams: {
        cassette: item,
        attrList: this.attrList
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  del(no) {
    this.service.delContainer(no)
      .subscribe(() => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
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
