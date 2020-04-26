import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { SessionService } from '@core';
import { Page } from '../../../../../models/page';
import { HttpResponse } from '@angular/common/http';
import { MessageContent } from './component/message-content';

@Component({
  selector: 'header-message',
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class HeaderWebsocketComponent implements OnInit{
  title;
  message;
  dataList = [];
  page = new Page();
  dataset = [];
  userInfo;
  data: NoticeItem[] = [
    {
      title: '消息',
      list: [],
      emptyText: '',
      emptyImage: '',
      clearText: '查看更多',
    }
  ];
  count = 0;
  loading = false;

  constructor(private msg: NzMessageService,
              private cdr: ChangeDetectorRef,
              private modal: NzModalService,
              public router: Router,
              private sessionService: SessionService,
              private messageService: MessageService,
  ) {
    this.userInfo = this.sessionService.userInfo;
  }

  ngOnInit(): void {
    const params = {
      curPage: this.page.curPage,
      pageSize: 4,
      name: this.userInfo.name,
    };
    this.messageService.qryMessages(params)
      .subscribe(data => {
        this.dataset = data['retList'];
        this.dataset.forEach( msg => {
          let list = {
            id: '',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            title: '',
            datetime: '',
            type: '消息',
            context: ''
          };
          list.id = msg.no;
          list.title = msg.noticeTitle;
          list.datetime = msg.time;
          list.context = msg.message;
          this.dataList.push(list);
        })
      });
  }

  private updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime!, {
          locale: (window as any).__locale__,
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type)!.list.push(newItem);
    });
    return data;
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.data = this.updateNoticeData(this.dataList);
      this.loading = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  clear(type: string) {
    this.openAdd();
  }

  select(res: any) {
    // let messageList;
    const id = {
      no: res.item.id
    };
    this.messageService.qryMessageByNo(id)
  .subscribe(data => {
    // messageList = data;
    this.message = data.message;
    this.title = data.noticeTitle;
    // this.msg.success(this.message);
    if(data.message != '' && data.noticeTitle != '') {
      this.openDetail(res);
    }
  });
  }

  openAdd() {
  this.router.navigateByUrl('user-center/message-detail')
  }

  openDetail(data){
    data.message = this.message;
    data.title = this.title;
    const window = this.modal.create({
      nzTitle: '具体消息',
      nzWidth: '50%',
      nzFooter: null,
      nzContent: MessageContent,
      nzZIndex: 2000,
      nzComponentParams: {
        data: data
      } ,
      nzOnOk: () => {

      },
      nzOnCancel: () => {

      },

    })
  }

}

