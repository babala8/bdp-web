import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

const pako = require('pako');

@Injectable()
export class WebsocketService {

  private _change$: Subject<any> = new Subject<any>();
  private lockReconnect = false;
  private ws: WebSocket;
  private timeHandle;
  private _tokenID = null;

  private heartCheck = {
    timeout: 10000, // 10s
    timeoutObj: null,
    serverTimeoutObj: null
  };

  constructor(private _notification: NzNotificationService) { }

  get change(): Observable<any> {
    return this._change$.pipe(share());
  }

  set tokenID(tokenID) {
    this._tokenID = tokenID;
  }

  public createWebSocket() {
    if (!this._tokenID) {
      return;
    }
    try {
      this.ws = new WebSocket(`${SOCKET_URL}?token=${this._tokenID}`);
      this.init();
    } catch (e) {
      console.log('websocket create error!');
      this.reconnect();
    }
  }

  private init() {
    this.ws.onclose = (ev: Event) => {
      console.log('链接关闭');
      this.reconnect();
    };
    this.ws.onerror = (ev: Event) => {
      console.log('发生异常了');
      this.reconnect();
    };
    this.ws.onopen = (ev: Event) => {
      this.ws.send(JSON.stringify({
        token: this._tokenID
      }));
      // 心跳检测重置
      this.heartCheckStart();
    };

    const that = this;

    this.ws.onmessage = (response: MessageEvent) => {

      // taget:show the notification of security warn 2019-09-18 zhangjs add
      const received_msg = response.data;
      if (typeof received_msg === 'string') {
        if (received_msg.match("warnMessageInfo")) {
          that._notification.error("警告", JSON.parse(received_msg).warnMessageInfo, { nzDuration: 600000 });
          return;
        }

      }
      // zhangjs end

      // 拿到任何消息都说明当前连接是正常的
      if (typeof response.data === 'string') {
        try {
          this._change$.next(JSON.parse(response.data));
        } catch (e) {
          this._change$.next(response.data);
        }
      } else {
        const reader = new FileReader();
        reader.readAsArrayBuffer(response.data);
        reader.onload = (e) => {
          const str = new Uint8Array(<ArrayBuffer>reader.result);
          // const restored = pako.inflate(str, { to: 'string', level: 9 });
          const restored = JSON.parse(this.Uint8ArrayToString(str));
          if (restored.type !== 'Heartbeat') {
            this._change$.next(restored);
          }
        };
      }

      clearTimeout(this.heartCheck.timeoutObj);
      clearTimeout(this.heartCheck.serverTimeoutObj);
      this.heartCheckStart();
    };
  }

  private heartCheckStart() {
    this.heartCheck.timeoutObj = setTimeout(() => {
      this.ws.send(JSON.stringify({ type: 'Heartbeat' }));
      this.heartCheck.serverTimeoutObj = setTimeout(() => {
        console.log('close connection');
        this.ws.close(); // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, this.heartCheck.timeout);
    }, this.heartCheck.timeout);
  }

  private reconnect() {
    if (this.lockReconnect) {
      return;
    }
    this.lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    if (this.timeHandle) {
      clearTimeout(this.timeHandle);
    }
    this.timeHandle = setTimeout(() => {
      this.createWebSocket();
      this.lockReconnect = false;
    }, 4000);
  }

  public sendMsg(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  public close() {
    this.tokenID = null;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }

  private Uint8ArrayToString(fileData) {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
  }
}
