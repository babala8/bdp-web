import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { delay } from 'rxjs/operators';
import { Menu, MenuService } from '../menu.service';
import { LayoutService } from './layout.service';
import { MenuChange } from './menu.change';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.sidebar.component.html',
  styleUrls: ['./layout.sidebar.component.less'],
})
export class LayoutSidebarComponent implements AfterViewInit, OnDestroy {
  isFetching = true;
  menus: Menu[];
  menuChange = MenuChange.getInstance();
  public display: 'block' | 'none' = 'none';

  constructor(
    private _router: Router,
    private menuService: MenuService,
    private _message: NzMessageService,
    public layoutService: LayoutService,
  ) {
    _router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      } else if (evt instanceof NavigationError) {
        this.isFetching = false;
      } else if (evt instanceof NavigationEnd) {
        this.display = evt.url.startsWith('/app') ? 'block' : 'none';
        this.isFetching = false;
      }
    });
  }
  _left = 0;
  show = false;
  animating: false;

  // 查询当前route位置
  getRefreshMenu() {
    const $slideBox = $('.slide-block');
    let index = 0;
    for (let i = 0; i < this.menus.length; i++) {
      for (let j = 0; j < this.menus[i].children.length; j++) {
        if (this.menus[i].children[j].url === this._router.url) {
          index = i;
          this.menus[i].children[j].selected = true;
          break;
        }
        for (let k = 0; k < this.menus[i].children[j].children.length; k++) {
          if (this.menus[i].children[j].children[k].url === this._router.url) {
            index = i;
            this.menus[i].children[j].selected = true;
            this.menus[i].children[j].children[k].selected = true;
            break;
          }
        }
      }
    }
    this.menuChange.setMenu(this.menus[index]);
    const $ele = $('header-menu ul>li').eq(index).position();
    if (!$ele) return;
    $slideBox.transitionOnce({
      'transform': `translateX(${$ele.left}px)`,
    });
  }

  ngAfterViewInit() {
    this.menuService.change.pipe(delay(0)).subscribe(menus => {
      console.log('layout', menus);
      this.menus = menus[1].children;
      this.getRefreshMenu();
    });
  }

  navigateUrl(link) {
    this._router.navigateByUrl(link)
      .then(() => {
        this.menuService.currentMenu = link;
      }, (error) => {
        console.log(error);
        this._message.error('该功能尚未开放！');
      });
  }

  changeSideBar() {
    this.layoutService.sideBarShowFlag = !this.layoutService.sideBarShowFlag;
  }

  ngOnDestroy(): void { }

}

