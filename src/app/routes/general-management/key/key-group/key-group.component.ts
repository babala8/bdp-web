import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { ModKeyGroupComponent } from './mod/mod-key-group.component';
import { AddKeyGroupComponent } from './add/add-key-group.component';
import {KeyService} from "../key.service";
import {Page} from "../../../../models/page";
import {SYS_CONS} from "../../../../models/constant";
import {AppService} from "../../../../app.service";

@Component({
  selector: 'app-key-group',
  templateUrl: './key-group.component.html'
})
export class KeyGroupComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();

  kStatus = SYS_CONS.KEY_GROUP_STATUS

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: KeyService) {

}

  ngOnInit() {
    this.reset();
  }

  openMod(data) {
    this.modal.create({
      nzTitle: '修改钥匙串',
      nzFooter: null,
      nzContent: ModKeyGroupComponent,
      nzComponentParams: {
        data: data
      },
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
        this.refreshData(true);
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });
  }

  openAdd() {
    this.modal.create({
      nzTitle: '添加钥匙串',
      nzFooter: null,
      nzContent: AddKeyGroupComponent,
      nzOnOk: () => {
        // 【成功时】，刷新数据，并回到第一页
        this.refreshData(true);
      },
      nzOnCancel: () => {
        // 一般情况，【取消时】，什么都不做
      },
    });
  }



  refreshData(reset = false) {
    if (reset) {
      this.page.curPage = 1;
    }

    const params = {
      clrCenterNo: this.formModel['clrCenterNo'] || '',
      keyGroupNo: this.formModel['keyGroupNo'] && this.formModel['keyGroupNo'].trim()|| '',
      status: this.formModel['status'] || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };;

    this.loading = true;
    this.service.getKeyGroup(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach((value, index, array) => {
          for(let i of this.kStatus){
            if(i.no === this.dataSet[index].status){
              this.dataSet[index]['keyGroupStatus'] = i.name
            }
          }
        })

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
    this.formModel['keyGroupNo'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['status'] = null;
    this.refreshData(true);
  }



  delKeyGroup(id) {
    this.service.delKeyGroup( id )
      .subscribe(_data => {
        this.message.success('删除成功！');
        this.refreshData(true);
      }, (error) => {
        if (error instanceof HttpResponse) {
          this.message.error(error.body.retMsg);
        }
      });
  }


}
