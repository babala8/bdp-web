import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { data2tree } from '@core/utils';
import { ReuseTabService } from '@delon/abc';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import { MenuService } from '../layout/menu.service';
import { SettingService } from '../layout/setting.service';
import { WebsocketService } from './websocket.service';

@Injectable()
export class SessionService implements OnDestroy {
  private isLogin = null;
  private _menuMap = new Map<string, string>();
  public loginObservable = new Subject();
  public tokenTimeOut;
  public refreshTokenFlag = false;

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private menuService: MenuService,
    private router: Router,
    private settingService: SettingService,
    private aclService: ACLService,
    private http: HttpClient,
    private wsService: WebsocketService,
  ) { }

  get userId() {
    // 这个就是账号
    return this.tokenService.get().username;
  }

  get isLoggedIn() {
    return this.isLogin;
  }

  get login_url() {
    return this.tokenService.login_url;
  }

  get canRetry() {
    return !!this.tokenService.get().token;
  }

  get userInfo() {
    return this.tokenService.get();
  }

  get userName() {
    // 这个是名字
    return this.tokenService.get().name;
  }

  get orgName() {
    return this.tokenService.get().sysOrg.name;
  }

  get orgNo() {
    return this.tokenService.get().sysOrg.no;
  }

  get buttonList() {
    return this.tokenService.get().buttonList;
  }

  get menuList() {
    return this.tokenService.get().menuList || [];
  }

  get token() {
    return this.tokenService.get().token;
  }

  get refreshToken() {
    return this.tokenService.get().refreshToken;
  }

  set verifyToken(token) {
    this.tokenService.set(token);
  }

  set userInfo(res) {
    const tokenFlag = {
      token: res.access_token,
      refreshToken: res.refresh_token,
    };
    this.isLogin = true;
    const buttonList = res.menuList.filter(item => {
      return item.buttonTag === '1';
    });
    const userInfo = Object.assign({ count: res.username }, res, tokenFlag, { buttonList });
    delete userInfo.access_token;
    delete userInfo.refresh_token;
    this.tokenService.set(userInfo);

    // 初始化websocket通信服务
    this.wsService.tokenID = res.access_token;
    this.wsService.createWebSocket();
    this.startTokenTimeOut();
  }

  refreshUserInfo(res) {
    this.wsService.close();
    const userInfo = this.userInfo;
    userInfo.token = res.access_token;
    userInfo.refreshToken = res.refresh_token;
    this.tokenService.set(userInfo);
    this.wsService.tokenID = res.access_token;
    this.wsService.createWebSocket();
    this.startTokenTimeOut();
  }

  get menuMap(): Map<string, string> {
    return this._menuMap;
  }

  logout() {
    // this.http.post(`${environment.SERVICE_URL}sys/callback/logout`,{}).subscribe(data=>{
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
    this.wsService.close();
    // });
  }

  setMenu() {
    const tempArray = [];
    for (const item of this.menuList) {
      item.text = item.name;
      item.menuId = item.menuId;
      item.link = item.url;
      item.size = item.size;
      item.bg = item.backgroundColor;
      delete item.name;
      delete item.backgroundColor;
      delete item.menuLevel;
      delete item.retCode;
      delete item.retMsg;
      if (item.url) {
        delete item.children;
        item.isLeaf = true;
      }
      if (item.buttonTag !== '1' && item.buttonTag !== '3') {
        tempArray.push(item);
        this._menuMap.set(item.link, item.text);
      }
    }
    this._menuMap.set('/app/app2/home', '首页');
    const menu = data2tree(tempArray);
    this.menuService.clear();
    menu.sort((value1, value2) => {
      return value1.menuOrder - value2.menuOrder;
    });
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].no === 'M') {
        menu.splice(i, 1);
        i--;
      }
    }
    const menu1 = [
      { text: 'a' },
      {
        text: '紫金大数据分析平台',
        children: menu,
      },
    ];
    this.menuService.add(menu1);

    const user = {
      'name': this.userName,
      'avatar': './assets/tmp/img/avatar.jpg',
      'email': this.userId,
    };
    this.settingService.setUser(user);
    this.aclService.setFull(true);
  }

  private _subject = new Subject();

  get refreshComplete$(): Observable<any> {
    return this._subject.asObservable();
  }

  // 开始执行定时任务
  startTokenTimeOut() {
    if (this.tokenTimeOut) {
      clearInterval(this.tokenTimeOut);
      this.tokenTimeOut = null;
    }

    const tokenArr = this.token.split('.');
    const delayTime = JSON.parse(atob(tokenArr[1]))['exp'] * 1000 - new Date().getTime() - 120000;
    this.tokenTimeOut = setTimeout(() => {
      this.refreshTokenFlag = true;
      this.http.post(environment.SERVICE_URL + 'auth/callback/refresh', this.refreshToken)
        .subscribe(result => {
          this.refreshTokenFlag = false;
          if (result['retCode'] === 'FF') {
            this._subject.complete();
            this.gotoException();
            return;
          }
          this.refreshUserInfo(result);
          this._subject.next(1);
        }, err => {
          this.refreshTokenFlag = false;
          this._subject.thrownError(err);
          this.gotoException();
        });
    }, delayTime);
  }

  // 清除定时任务
  cleartokenTimeOut() {
    if (this.tokenTimeOut) {
      clearInterval(this.tokenTimeOut);
      this.tokenTimeOut = null;
      this.refreshTokenFlag = false;
    }
  }

  // 超时或者请求刷新token失败，跳转到401界面
  gotoException() {
    this.tokenService.clear();
    this.router.navigateByUrl('/zijin-exception/401');
    this.cleartokenTimeOut();
  }

  ngOnDestroy(): void {
    this.cleartokenTimeOut();
  }
}
