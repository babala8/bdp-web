import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '@core/session.service';
import { IMaster } from '@zijin/messi';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { LayoutService } from '../sidebar/layout.service';
import { AppManageService } from './app.manage.service';

@Component({
  selector: 'app-manager',
  templateUrl: './app.manager.component.html',
  styleUrls: ['./app.manager.component.less'],
})
export class AppManagerComponent implements OnInit, OnDestroy {
  @ViewChild('child') childElement: ElementRef;
  public _messiMaster: IMaster;
  public loading = true; // 加载动画
  private _subscription: Subscription;

  constructor(
    private _router: Router,
    private _session: SessionService,
    private _appManageService: AppManageService,
    private _appService: AppService,
    public layoutService: LayoutService,
  ) {
  }

  ngOnInit() {
    this._messiMaster = null;
    this._appService.messiMaster.then(res => {
      const messiMaster = this._messiMaster = res;
      // 注册函数getToken，以便子应用调用从而获取登录信息等
      messiMaster.addOrReplaceMethod('getToken', () => {
        return this._session.userInfo;
      });
      // 注册gotoLogin函数，在子应用token失效时跳转到主应用login页面
      messiMaster.addOrReplaceMethod('gotoLogin', () => {
        this._session.logout();
      });
      // messiMaster.addOrReplaceMethod('tokenTimeout', () => {
      //   this._session.logout();
      // });
      // 加载完第一个子应用后会相继预加载剩下的子应用
      messiMaster.navigateByURL(this._router.url).then((data) => {
        this.loading = false;
        // if (this._firstLoad) {
        //   this._firstLoad = false;
        //   messiMaster.preload().then((data1) => {
        //     console.log('所有子应用加载完毕!');
        //   });
        // }
      });

      // 监听路由变化进行路由跳转
      this._subscription = this._appManageService.urlChange.subscribe((url: any) => {
        console.log('url变化', url);
        this.loading = true;
        messiMaster.navigateByURL(this._router.url).then((data) => {
          this.loading = false;
        });
      });
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    console.log('我是appManager组件，我被销毁了')
    try {
      this._messiMaster.restore();
    } catch (e) {
      console.log('error')
    }
  }

  loadingStart() {
    this.childElement.nativeElement.innerHTML = `
      <div class="loading">
        <p>loading</p>
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>`;
  }

  loadingEnd() {
    const loadingSelector = this.childElement.nativeElement.querySelector('.loading');
    if (loadingSelector) {
      loadingSelector.style.display = 'none';
    }
  }
}

@Component({
  template: `
    <div></div>`,
})
export class EmptyContainerComponent implements OnInit {
  constructor(private _appManageService: AppManageService, private _router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._router.url.subscribe(url => {
      console.log('路由地址变化了', url);
      this._appManageService.urlChange.next(url);
    });
  }
}
