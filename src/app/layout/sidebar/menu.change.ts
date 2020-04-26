import {Subject} from 'rxjs';
import {EventEmitter} from '@angular/core';

export class MenuChange {

  private static instance = new MenuChange();
  public subject$ = new Subject();
  public mathMenu = new EventEmitter();

  public quickMenu$ = new Subject();

  // 将 constructor 设为私有属性，防止 new 调用
  private constructor() {
  }

  static getInstance(): MenuChange {
    return MenuChange.instance;
  }

  setMenu(menu) {
    this.subject$.next(menu);
  }

  getMenu() {
    return this.subject$.asObservable();
  }

  setQuickMenu(menu)  {
    this.quickMenu$.next(menu);
  }

  getQuickMenu()  {
    return this.quickMenu$.asObservable();
  }
}
