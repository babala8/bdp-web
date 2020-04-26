import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LayoutService } from './layout.service';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuickMenuService implements OnDestroy {

  // 使用BehaviorSubject可以使其他地方第一次订阅时可以订阅到上一次的值
  public quickMenu$ = new BehaviorSubject([]);

  // 将 constructor 设为私有属性，防止 new 调用
  private constructor(private layoutService: LayoutService) {
    this.setQuickMenu();
  }

  // 设置快捷菜单
  setQuickMenu() {
    // this.quickMenu$.next(menu);
    this.layoutService.qryQuickMenu({})
      .subscribe(data => {
        this.quickMenu$.next(data['retList']);
      });
  }

  // 查询快捷菜单
  getQuickMenu()  {
    return this.quickMenu$.asObservable().pipe(share());
  }

  ngOnDestroy(): void {
    this.quickMenu$.unsubscribe();
  }
}
