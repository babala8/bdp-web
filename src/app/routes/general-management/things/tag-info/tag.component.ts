import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';
import { AddTagComponent } from './add/add-tag.component';
import { ModTagComponent } from './mod/mod-tag.component';
import { TagAddMutipleComponent } from './add/tag-add-mutiple.component';
import {Page} from "../../../../models/page";
import {AppService} from "../../../../app.service";
import {SYS_CONS} from "../../../../models/constant";
import { ThingsService } from "../things.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();
  tType = SYS_CONS.TAG_TYPE;
  tStatus = SYS_CONS.TAG_STATUS;

  constructor(private modal: NzModalService,
              private appService: AppService,
              private message: NzMessageService,
              private service: ThingsService) {

  }

  ngOnInit() {
    this.reset();
  }

  openMod(data) {
    this.modal.create({
      nzTitle: '修改标签',
      nzWidth: '80%' ,
      nzFooter: null,
      nzContent: ModTagComponent,
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
      nzTitle: '添加标签',
      nzWidth: '80%' ,
      nzFooter: null,
      nzContent: AddTagComponent,
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
        tagType: this.formModel['tagType'] || '',
        tagTid: this.formModel['tagTid'] && this.formModel['tagTid'].trim()|| '',
        status: this.formModel['status'],
        curPage: this.page.curPage,//当前页码
        pageSize: this.page.pageSize,//每页条数
    };
 console.log("ssssssssssssss"+params.tagTid);
    this.loading = true;
    this.service.getTag(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach((value, index, array) => {
          for(let i of this.tStatus){
            if(i.no === this.dataSet[index].status){
              this.dataSet[index]['tagStatus'] = i.name
            }
          }
          for(let i of this.tType){
            if(i.no === this.dataSet[index].tagType){
              this.dataSet[index]['tagTypeName'] = i.name
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
    this.formModel['tagTid'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['status'] = null;
    this.formModel['tagType'] = null;
    this.refreshData(true);
  }



  delTag(id) {
    this.service.delTag( id )
      .subscribe(_data => {
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
    const addMutiple = this.modal.create({
      nzTitle: '批量添加标签信息',
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: '60%',
      nzZIndex: 990,
      nzContent: TagAddMutipleComponent,
      nzComponentParams: {
      },
      nzOnOk: () => {
        this.refreshData(true);
      },
      nzOnCancel: () => {
      },
    });
  }




}
