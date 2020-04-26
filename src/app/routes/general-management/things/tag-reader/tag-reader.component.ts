 import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../models/page';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AppService } from '../../../../app.service';
import { HttpResponse } from '@angular/common/http';
import { SYS_CONS } from '../../../../models/constant';
import { ThingsService } from "../things.service";
 import { ModReaderComponent } from './mod/mod-reader.component';
import { AddReaderComponent } from './add/add-reader.component';

@Component({
  selector: 'app-tag-reader',
  templateUrl: './tag-reader.component.html'
})
export class TagReaderComponent implements OnInit {

  formModel = {};
  lines = [];
  loading = true;
  dataSet = [];
  page = new Page();
  rType = SYS_CONS.READER_TYPE;
  rStatus = SYS_CONS.READER_STATUS;

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
      nzTitle: '修改读写器',
      nzWidth: '90%' ,
      nzFooter: null,
      nzContent: ModReaderComponent,
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
      nzTitle: '添加读写器',
      nzWidth: '90%' ,
      nzFooter: null,
      nzContent: AddReaderComponent,
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
      simNumberNo: this.formModel['simNumberNo'] && this.formModel['simNumberNo'].trim() || '',
      location: this.formModel['location'] && this.formModel['location'].trim() || '',
      tagReaderNo: this.formModel['tagReaderNo'] && this.formModel['tagReaderNo'].trim() || '',
      readerType: this.formModel['readerType'] || '',
      status: this.formModel['readerStatus'] || '',
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
    console.log("ssssssssssssssss"+params.clrCenterNo);

    this.loading = true;
    this.service.getTagReader(params)
      .subscribe(_data => {
        this.loading = false;
        this.dataSet = _data.retList;
        this.dataSet.forEach((value, index, array) => {
          for(let i of this.rType){
            if(i.no === this.dataSet[index].readerType){
              this.dataSet[index]['readerTypeName'] = i.name
            }
          }
          for(let i of this.rStatus){
            if(i.no === this.dataSet[index].status){
              this.dataSet[index]['readerStatus'] = i.name
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
    this.formModel['readerType'] = null;
    this.formModel['clrCenterNo'] = null;
    this.formModel['tagReaderNo'] = null;
    this.formModel['location'] = null;
    this.formModel['simNumberNo'] = null;
    this.formModel['readerStatus'] = null;
    this.refreshData(true);
  }



  delReader(id) {
    this.service.delTagReader( id )
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
