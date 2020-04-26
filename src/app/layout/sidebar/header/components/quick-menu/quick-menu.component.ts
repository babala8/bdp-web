import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../../menu.service';
import { Observable, Subscription } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd';
import { LayoutService } from '../../../layout.service';
import { QuickMenuService } from '../../../quick-menu.service';

@Component({
  templateUrl: 'quick-menu.component.html',
})
export class QuickMenuComponent implements OnInit, OnDestroy {
  menuService$: Subscription;
  menus;
  quickMenuSet = new Set();
  constructor(private menuService: MenuService,
    private modalRef: NzModalRef,
    private layoutService: LayoutService,
    private quickMenuService: QuickMenuService) {

  }

  ngOnInit(): void {
    this.menuService$ = this.menuService.change.subscribe(menus => {
      this.menus = menus[1];
    });
    this.dealQuickMenu();
  }

  // 查询到快捷菜单，然后进行处理
  dealQuickMenu() {
    this.quickMenuService.getQuickMenu().subscribe(data => {
      (<any[]>data).forEach(menu => {
        this.quickMenuSet.add(menu.no);
      })
    })
  }

  // 选择与取消选择菜单
  chooseMenu(menuNo) {
    if (this.quickMenuSet.has(menuNo)) {
      this.quickMenuSet.delete(menuNo);
    } else {
      this.quickMenuSet.add(menuNo);
    }
  }

  save() {
    const saveList = Array.from(this.quickMenuSet);
    this.layoutService.saveMenu(saveList).subscribe(data => {
      console.log(data);
      this.quickMenuService.setQuickMenu();
      this.modalRef.triggerOk();
    });
  }

  ngOnDestroy(): void {
    this.menuService$.unsubscribe();
  }
}
