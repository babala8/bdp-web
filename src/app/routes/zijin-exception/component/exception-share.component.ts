import {
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { DelonLocaleService, LocaleData } from '@delon/theme';
import { isEmpty } from '@delon/util';
import { DA_SERVICE_TOKEN, ITokenService, TokenService } from '@delon/auth';
import { Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebsocketService } from '@core/websocket.service';

export type ExceptionType = 401 | 403 | 404 | 500;

@Component({
  selector: 'zijin-exception',
  exportAs: 'zijin-exception',
  templateUrl: './exception-share.component.html',
  host: { '[class.exception]': 'true' },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExceptionShareComponent implements OnInit, OnDestroy {
  private i18n$: Subscription;
  @ViewChild('conTpl')
  private conTpl: ElementRef;

  _type: ExceptionType;
  locale: LocaleData = {
    401: '登录超时，请重新登录',
    403: '抱歉，你无权访问该页面',
    404: '抱歉，你访问的页面不存在',
    500: '抱歉，服务器出错了',
    backToLogin: '返回登录',
  };
  hasCon = false;

  _img = '';
  _title = '';
  _desc = '';

  @Input()
  set type(value: ExceptionType) {
    const item = {
      401: {
        img: 'assets/images/exception/page401.png',
        title: '401',
      },
      403: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
        title: '403',
      },
      404: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
      },
      500: {
        img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
        title: '500',
      },
    }[value];

    if (!item) return;

    this._type = value;
    this._img = item.img;
    this._title = item.title;
    // this._desc = this.locale[this._type];
    // this.localeName = this.locale.backToLogin
    // console.log(this.locale[this._type]);
  }

  @Input()
  set img(value: string) {
    this._img = value;
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }

  @Input()
  set desc(value: string) {
    this._desc = value;
  }

  checkContent() {
    this.hasCon = !isEmpty(this.conTpl.nativeElement);
  }

  constructor(private i18n: DelonLocaleService,
              private router: Router,
              private ws: WebsocketService) {
  }

  ngOnInit() {
    // this.i18n$ = this.i18n.change.subscribe(() => (this.locale = this.i18n.getData('exception')));
    this.checkContent();
  }

  navigateToLogin() {
    this.ws.close();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.i18n$.unsubscribe();
  }
}
