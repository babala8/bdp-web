import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from '@core/session.service';
import { IMaster } from '@zijin/messi';
import { AppService } from '../../../app.service';
import { AppReuseStrategy } from '../../../app-reuse-strategy';
import { url } from 'inspector';
import { AppManageService } from '../../app-manager/app.manage.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Menu, MenuService } from '../../menu.service';
import { MenuChange } from '../menu.change';
import { TabBarComponent } from './tab-bar.component';

interface TabItem {
  id: string,
  url: string,
  text: string,
  active: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TabBarService implements OnInit, OnDestroy {
  private _tabArray: TabItem[] = [];
  private _urlArray: string[] = [];
  private _subscribtion$: Subscription;
  private _menuMap = this._session.menuMap;
  private _messiMaster: IMaster = null;
  private _everyAppCurrentUrl = new Map<string, string>();
  private _currentPageUrl: string;
  private menus: Menu[];
  tabBar: TabBarComponent;

  constructor(private _router: Router,
    private _session: SessionService,
    private _activeRouter: ActivatedRoute,
    private _appService: AppService,
    private _appManageService: AppManageService,
    private _reuseTabService: AppReuseStrategy,
    private menuService: MenuService,
  ) {
    this._appService.messiMaster.then(res => {
      this._messiMaster = res;
      // this._messiMaster.registerMethod('tokenTimeout', () => {
      //   this._session.logout();
      // });
    });

    this._subscribtion$ = this._appManageService.urlChange.subscribe(data => {
      if (this._router.url.startsWith('/app')) {
        const arry = this._router.url.split('/');
        this._everyAppCurrentUrl.set(arry[2], this._router.url);
      }
    });
    this.menuService.change.subscribe(menus => {
      this.menus = menus[1].children;
    })
  }
  ngOnInit(): void {

  }

  // 查询当前route位置
  getRefreshMenu(currentUrl: string) {
    for (let i = 0; i < this.menus.length; i++) {
      for (let j = 0; j < this.menus[i].children.length; j++) {
        for (let k = 0; k < this.menus[i].children[j].children.length; k++) {
          this.menus[i].children[j].children[k].url === currentUrl ? this.menus[i].children[j].children[k].selected = true : this.menus[i].children[j].children[k].selected = false;
        }
      }
    }
    // console.log(index);
    // $slideBox.transitionOnce({
    //   'transform': `translateX(${$('header-menu ul>li').eq(index).position().left}px)`,
    // });
  }

  get urlArray(): string[] {
    return this._urlArray;
  }

  get tabArray() {
    return this._tabArray;
  }

  // 获取真正的路由
  getTruthRoute(route: ActivatedRouteSnapshot) {
    let next = route;
    while (next.firstChild) next = next.firstChild;
    return next;
  }

  public initTab() {
    if (this._tabArray.length <= 0) {
      this._tabArray.push({
        id: Math.random().toFixed(60),
        url: this._router.url,
        text: this._menuMap.get(this._router.url) || '首页',
        active: true,
      });
      this._urlArray.push(this._router.url);
    }

    this._router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        const snapshotTrue = this.getTruthRoute(this._activeRouter.snapshot);

        if (this._router.url.startsWith('/login') || this._router.url.startsWith('/screen') || this._router.url.startsWith('/zijin-exception')) return;
        const data = this._router.url;
        if (this._urlArray.includes(data)) { // 如果导航的url已缓存至标签页则置标签样式为激活态
          this._tabArray.forEach(value => {
            if (data !== value.url) {
              value.active = false;
            } else {
              value.active = true;
            }
          });
          return;
        }
        // 如果标签栏中还未缓存该页面则重新添加至标签栏
        const item = {
          id: Math.random().toFixed(60),
          url: data,
          text: this._menuMap.get(data) || snapshotTrue.data.text,
          active: true,
        };
        // debugger
        this._urlArray.push(data);
        this._tabArray.push(item);
        this.tabBar.scrollToRight();
        this._tabArray.forEach(value => {
          if (item.id !== value.id) {
            value.active = false;
          }
        });
      });
  }

  public navigateUrl(item) {
    this.getRefreshMenu(item.url);
    this._router.navigateByUrl(item.url).then(res => {
      this._tabArray.forEach(va => {
        item.id === va.id ? va.active = true : va.active = false;
      });
    });
  }

  public deleteItem(id) {
    if (this._tabArray.length <= 1) return;
    this._tabArray.forEach((item, index) => {
      if (item.id === id) {
        const _index = this._urlArray.findIndex(ele => item.url === ele);
        this._urlArray.splice(_index, 1);
        if (this._tabArray[_index].active) {
          // 如果要删除的是当前激活页面，则分为以下多种情况
          // 第一种情况，待删除页面是主应用页面，此时需要直接删除该页面，并且再导航至标签栏前一页面或者后一页面
          if (!item.url.startsWith('/app')) { // 如果要删除页面不是子应用页面，只需导航至下一页面即可
            this._reuseTabService.deleteRouteSnapshot(item.url);
          } else {
            // 第二种情况，当前页面为子应用页面且在激活状态,此时可确定该子应用激活激活页面就是当前页面故，可直接删除该页面后还需进行一个操作，
            // 为防止出现该子应用页面被删除后下一个自动跳转的页面不是同一子应用页面，
            // 使子应用导航至一个空白页面,且再导航至空白页面成功后再进行默认导航
            // 如果当前活动页为第一个标签页，则默认导航至后一个标签页，否则导航至前一个标签页
            // 如果当前活动页为第一个标签页，则默认导航至后一个标签页，否则导航至前一个标签页
            const urlArray = item.url.split('/'); // 拆分url
            const targetApp = urlArray[2]; // 获取子应用名称
            const targetUrl = `/${urlArray.splice(3).join('/')}`; // 获取要销毁的子应用页面url
            this._messiMaster.triggerEventInApp(targetApp, 'closeCurrentUrl', targetUrl);
          }
        } else {
          // 如果删除的页面不是处于激活页面
          if (!item.url.startsWith('/app')) { // 如果要删除页面不是子应用页面，只需导航至下一页面即可
            this._reuseTabService.deleteRouteSnapshot(item.url);
          } else {
            // 如果删除的页面为子应用页面，但是不知道是否为该应用自己的激活页面
            const urlArray = item.url.split('/'); // 拆分url
            const targetApp = urlArray[2]; // 获取子应用名称
            const targetUrl = `/${urlArray.splice(3).join('/')}`; // 获取要销毁的子应用页面url
            if (this._everyAppCurrentUrl.get(targetApp) && this._everyAppCurrentUrl.get(targetApp) === item.url) {
              // 如果删除的页面为子应用激活页面则
              this._messiMaster.triggerEventInApp(targetApp, 'closeCurrentUrl', targetUrl); // 关闭子应用激活页面
              // 在子应用关闭自己的激活页面时要做以下2个操作，一，导航至空白页面，二，在导航成功后要调用主系统
            } else {
              this._messiMaster.triggerEventInApp(targetApp, 'closeReuseTabByUrl', targetUrl); // 触发子应用事件删除缓存
            }
          }

        }
        if (_index > 0) { // 如果当前活动页为第一个标签页，则默认导航至后一个标签页，否则导航至前一个标签页
          this._router.navigateByUrl(this._tabArray[_index - 1].url); // 如果当前页面不是标签栏的第一个页面则默认导航至前一标签页
        } else {
          this._router.navigateByUrl(this._tabArray[_index + 1].url); // 如果当前页面是标签栏的第一个页面则默认导航至下一页面
        }
        this._tabArray.splice(index, 1);
        return;
      }
    });
  }

  public clearTab() {
    const temArray = [];
    this._tabArray.forEach(item => {
      if (!item) return;
      if (item.url.startsWith('/app')) {
        const targetAppName = item.url.split('/')[2];
        temArray.push(targetAppName);
      }
    });
    const targetApp = Array.from(new Set(temArray)); // 获取当前已打开标签页的所有子应用名称
    targetApp.forEach(appName => {
      this._messiMaster.triggerEventInApp(appName, 'closeAllReuseTab', null); // 对每个子应用触发清空缓存事件
    });
    this._tabArray = this._tabArray.filter(va => va.active);
    this._reuseTabService.clearRouteSnapshot();
    this._urlArray = [this._tabArray[0].url];
  }

  destroy(): void {
    this.clearTab();
    this._tabArray = [];
    this._urlArray = [];
  }

  ngOnDestroy(): void {
    this._subscribtion$.unsubscribe();
  }

}
