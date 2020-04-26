import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '@core';
import { Subscription } from 'rxjs';

/** 出入库监控 */
@Component({
  templateUrl: './monitor.component.html',
})
export class MonitorComponent implements OnInit, OnDestroy {
  messageData = [];
  toReadList = [];
  wsObservable: Subscription;
  loading = false;
  clrCenterNo;

  constructor(private ws: WebsocketService) { }

  ngOnInit(): void {
    this.wsObservable = this.ws.change.subscribe(data => {
      if (data.type === 'InOut') {
        data.hasRead = false;

        const data1 = [];

        data.forEach(item => {
          if (this.clrCenterNo != null && this.clrCenterNo !== '') {
            if (this.clrCenterNo === item.clrCenterNo) {
              data1.push(item);
            }
          } else {
            data1.push(item);
          }
        });

        this.toReadList = [data1, ...this.toReadList];
        this.messageData = [data1, ...this.messageData];
      }
    });
  }

  // 清空未读消息
  clearUnRead() {
    this.toReadList.forEach(item => {
      item.hasRead = true;
    });
    this.toReadList = [];
  }

  // 清空所有信息
  clearAll() {
    this.toReadList = [];
    this.messageData = [];
  }

  ngOnDestroy(): void {
    this.wsObservable.unsubscribe();
  }

}
