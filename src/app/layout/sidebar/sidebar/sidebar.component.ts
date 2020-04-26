import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../../menu.service';
import { LayoutService } from '../layout.service';
import { MenuChange } from '../menu.change';
import { QuickMenuService } from '../quick-menu.service';

@Component({
  selector: 'zj-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})

export class SidebarComponent implements OnInit, OnDestroy {
  menuSubscribe$: Subscription;
  subMenuSubscribe$: Subscription;
  quickMenuSubscribe$: Subscription;
  menu = {};
  subMenu: any = {};
  oldSelectedMenu;
  quickMenu: any = {
    text: '快捷菜单',
    icon: '',
    children: []
  };

  constructor(
    private menuService: MenuService,
    private _router: Router,
    public layoutService: LayoutService,
    private quickMenuService: QuickMenuService
  ) { }

  ngOnInit(): void {
    this.menuSubscribe$ = this.menuService.change.subscribe(data => {
      this.menu = data[1];
    });
    this.subMenuSubscribe$ = MenuChange.getInstance().getMenu().subscribe(data => {
      console.log(data);
      this.subMenu = data;
      this.getSelectedMenu();
    });

    this.qryQuickMenus();
  }

  // 查询快捷菜单
  qryQuickMenus() {
    // 需要订阅快捷菜单的变化，然后刷新快捷菜单
    this.quickMenuSubscribe$ = this.quickMenuService.getQuickMenu().subscribe(data => {
      this.quickMenu.children = data;
    });
  }

  // 打开关闭二级菜单
  openSubMenu(menu1) {
    menu1.selected = !menu1.selected;
    console.log(menu1.selected);
  }

  // 点击三级菜单进行导航
  navigate(menu) {
    if (this.oldSelectedMenu) {
      this.oldSelectedMenu.selected = false;
    }
    menu.selected = true;
    this.oldSelectedMenu = menu;
    console.log(menu);
    this._router.navigateByUrl(menu.url).then(() => {
      this.matchQuickMenu();
    });
  }

  // 遍历现有菜单，将选中的菜单赋值给oldSelected
  getSelectedMenu() {
    this.subMenu.children.forEach(menu1 => {
      if (menu1.children.length <= 0) {
        if (menu1.selected === true) {
          this.oldSelectedMenu = menu1;
          return;
        }
      } else {
        menu1.children.forEach(menu2 => {
          if (menu2.selected === true) {
            this.oldSelectedMenu = menu2;
            return;
          }
        })
      }
    })
  }

  // 打开快捷菜单
  openQuickMenu() {
    this.quickMenu.selected = !this.quickMenu.selected;
    console.log(this.quickMenu.children);
  }

  // 查询到快捷菜单列表后，将菜单中相匹配的菜单置为选中状态
  matchQuickMenu() {
    const length = this.quickMenu.children.length;
    for (let i = 0; i < length; i++) {
      this.quickMenu.children[i].url === this._router.url ? this.quickMenu.children[i].selected = true : this.quickMenu.children[i].selected = false;
    }
  }

  // 组件销毁时取消订阅
  ngOnDestroy(): void {
    this.menuSubscribe$.unsubscribe();
    this.subMenuSubscribe$.unsubscribe();
    this.quickMenuSubscribe$.unsubscribe();
  }

  // 展开收起侧边栏菜单
  changeSidebarSize() {
    this.layoutService.sideBarShowFlag = !this.layoutService.sideBarShowFlag;
  }

}
