import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import {Page} from "../../../../models/page";
import {SYS_CONS} from "../../../../models/constant";
import {AppService} from "../../../../app.service";
import {KeyService} from "../key.service";
import {ModKeyComponent} from "./component/mod/mod-key.component";
import {AddKeyComponent} from "./component/add/add-key.component";

@Component({
  selector: 'app-key-type',
  templateUrl: './key-type.component.html'
})
export class KeyTypeComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();

  range = SYS_CONS.KEY_RANGE;

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private keyTypeService: KeyService) {

}

  ngOnInit() {
    this.reset();
  }

  openMod(data) {
    this.modal.create({
      nzTitle: '修改钥匙类型',
      nzFooter: null,
      nzContent: ModKeyComponent,
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
      nzTitle: '添加钥匙类型',
      nzFooter: null,
      nzContent: AddKeyComponent,
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
      keyUseRange: this.formModel['keyUseRange'] || '',
      keyTypeName: this.formModel['keyTypeName'] && this.formModel['keyTypeName'].trim()  || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    this.loading = true;
    this.keyTypeService.getKeyType(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach((value, index, array) => {
          for(let i of this.range){
            if(i.no === this.dataSet[index].keyUseRange){
              this.dataSet[index]['keyRangeName'] = i.name
            }
          }
        });
        console.log(this.dataSet);
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
    this.formModel['keyUseRange'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['keyTypeName'] = null;
    this.refreshData(true);
  }



  delKey(id) {
    this.keyTypeService.delKeyType( id )
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
