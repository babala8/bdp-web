import { Component, OnInit } from '@angular/core';
import { Page } from '../../../models/page';
import { HttpResponse } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { MessageDetailService } from './message-detail.service';
import { Router } from '@angular/router';
import { SessionService } from '@core';

@Component({
  templateUrl: './message-detail.html',
})

export class MessageDetail implements OnInit {
  userInfo;
  messageType = [];
  startTime = new Date();
  page = new Page();
  loading;
  dataSet;
  formModel = {
    messageType: this.messageType,
    startTime: this.startTime
  };

  constructor(
    private service: MessageDetailService,
    private message: NzMessageService,
    public router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.getMessageType();
    this.refreshData();
  }

  reset() {
    this.formModel.messageType = [];
    this.formModel.startTime =  new Date();
    this.page.curPage = 1;
    this.refreshData();
  }

  refreshData() {
    this.userInfo = this.sessionService.userInfo;
    this.loading = true;
    const params = {
      time: this.formModel['startTime'] ? this.formModel['startTime'].format('YYYY-MM-DD'): '',
      noticeCategory: this.formModel['messageType'] ? this.formModel['messageType']: '',
      name: this.userInfo.name,
      curPage: this.page.curPage,//当前页码
      pageSize: this.page.pageSize,//每页条数
    };
     this.service.qryMessage(params)
      .subscribe(_data => {
        this.dataSet = _data['retList'];
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

getMessageType() {
    this.userInfo = this.sessionService.userInfo;
    const params = {
      name: this.userInfo.name,
      curPage: this.page.curPage,//当前页码
      pageSize: 100,//每页条数
  };
    this.service.qryMessage(params)
     .subscribe(_data => {
        let retList = _data['retList'];
          retList.forEach(item => {
         let list = {
           name: ''
         };
           list.name = item.noticeCategory;
            this.messageType = this.messageType.concat(list);
          });
        let result = [];
        let obj = [];
        let str;
        for(let i = 0; i <this.messageType.length; i++) {
          str = JSON.stringify(this.messageType[i]);
          if(obj.indexOf(str) == -1) {
            result.push(this.messageType[i]);
            obj.push(str);
            this.messageType = result;
            console.log(this.messageType);
          }
        }
     });
  }

}
