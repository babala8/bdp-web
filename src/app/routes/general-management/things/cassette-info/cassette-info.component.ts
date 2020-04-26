import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionService } from "@core";
import { CONTAINER_TYPE, SYS_CONS } from 'app/models/constant';
import { Page } from "app/models/page";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ThingsService } from "../things.service";
import { CassetteAddMutipleComponent } from './add/cassette-add-mutiple.component';
import { CassetteInfoAddComponent } from './add/cassetteInfo-add.component';
import { CassetteInfoModComponent } from './mod/cassetteInfo-mod.component';

@Component({
  selector: 'app-cassette-info',
  templateUrl: './cassette-info.component.html',
  styles: [`
        a:hover {
            text-decoration: underline;
            color: #23527c;
        }
    `]
})

export class CassetteInfoComponent implements OnInit {
  attrList = [];
  dataList = [];
  formModel = {};
  loading = true;
  page = new Page();
  cassetteTypes = SYS_CONS.CASSETTE_TYPE;
  cassetteStauss = SYS_CONS.CASSETTE_STATUS;
  devVendors = [];
  curOrg = {
    no: this.session.orgNo,
    name: this.session.orgName,
    orgType: this.session.userInfo.sysOrg.no
  };
  statusList = SYS_CONS.CONTAINER_STATUS;

  constructor(private nzModal: NzModalService,
    private message: NzMessageService,
    private session: SessionService,
    private cassetteInfoService: ThingsService
  ) {
  }

  ngOnInit() {
    const params1 = [];
    this.cassetteInfoService.getDevVenders(params1).subscribe(_data => {
      this.devVendors = _data['retList'];
    });
    this.refreshData(true);
    this.getProductAttribute();
  }

  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }
    const attr = [
      this.formModel['cassetteType'],
      this.formModel['cassette_vendor']
    ].filter(e => !!e).concat(',') + '',
      params = {
        containerNo: this.formModel['casstte_no'] && this.formModel['casstte_no'].trim() || '',
        productNo: CONTAINER_TYPE.CASSETTE,
        status: this.formModel['cassetteStaus'] || '',
        params: attr,
        curPage: this.page.curPage,
        pageSize: this.page.pageSize,
      };
    this.loading = true;

    this.cassetteInfoService.qryContainerList(params)
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
      nzTitle: '添加钞箱信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '70%',
      nzZIndex: 990,
      nzContent: CassetteInfoAddComponent,
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
      nzTitle: '修改钞箱信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '70%',
      nzZIndex: 990,
      nzContent: CassetteInfoModComponent,
      nzComponentParams: {
        cassetteInfo: item,
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
    this.cassetteInfoService.delContainer(no)
      .subscribe(data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }

  // 批量添加
  openAddMuti() {
    this.nzModal.create({
      nzTitle: '批量添加钞箱信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '40%',
      nzZIndex: 990,
      nzContent: CassetteAddMutipleComponent,
      nzComponentParams: {
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }

  getProductAttribute() {
    this.attrList = [];
    this.cassetteInfoService.getProductAttribute(CONTAINER_TYPE.CASSETTE)
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
