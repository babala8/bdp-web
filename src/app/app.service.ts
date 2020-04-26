import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { SessionService } from '@core/session.service';
import { IMaster, messiMasterBuilder } from '@zijin/messi';
import { NzMessageService } from 'ng-zorro-antd';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _messiMaster: Promise<IMaster> = null;
  private _appNameList: string[] = [];

  // 初始化messiMaster对象，全局唯一。
  constructor(
    private _http: HttpClient,
    private _session: SessionService,
    private ngZone: NgZone,
    private message: NzMessageService
  ) {
    this._messiMaster = new Promise<IMaster>(resolve => {
      this._http.get('assets/apps.json').subscribe((data: any) => {
        let messiMaster;
        data.forEach(va => {
          this._appNameList.push(va.name);
        });
        messiMaster = messiMasterBuilder({
          parentElement: '#messiContainer',
          preload: false,
          preloadSize: 2,
        }, data);
        messiMaster.addOrReplaceMethod('tokenTimeout', () => {
          this.ngZone.run(() => {
            this.message.error('登录信息失效，请重新登录');
            this._session.gotoException();
          });
        });
        resolve(messiMaster);
      });
    });
    this._session.loginObservable.subscribe(data => {
      // this.startInterval();
    })
  }

  get messiMaster(): Promise<IMaster> {
    return this._messiMaster;
  }

  get appNameList() {
    return this._appNameList;
  }
}
