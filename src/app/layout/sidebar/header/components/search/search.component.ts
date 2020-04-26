import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../../menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})

export class HeaderSearchComponent implements OnInit, OnDestroy {
  menuList = [];
  openFlag = false;
  selectedMenu;
  menuSubscription$: Subscription;

  constructor(private _router: Router,
              private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.menuSubscription$ = this.menuService.change.subscribe(menu => {
      this.menuList = [];
      this.dealSubMenu(menu[1]);
    })
  }

  // 递归处理menu
  dealSubMenu(menu) {
    if (!!menu.children && menu.children.length > 0) {
      menu.children.forEach(subMenu => {
        this.dealSubMenu(subMenu);
      })
    }else {
      this.menuList.push(menu);
    }
  }
  // 当搜索条件变化时
  searchChange(text) {
    if (!!text) {
      this.openFlag = false;
    }
  }

  menuChange(value) {
    this._router.navigateByUrl(value);
  }

  ngOnDestroy(): void {
    this.menuSubscription$.unsubscribe();
  }
}
