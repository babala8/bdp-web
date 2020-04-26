import { Injectable } from '@angular/core';
import { SessionService } from '@core/session.service';

const excludes = ['/warehouse/position', '/develop/charts/:id', '/app/app2/home', '/home', '/zijin-exception/401'];

// TODO: 验证用户是否登录
@Injectable()
export class AuthService {
  constructor(
    private _session: SessionService,
  ) { }

  checkPermission(url: string, targetUrl: string): boolean {
    const urlArry = [];
    const menuArray = this._session.menuList;
    let ret = false;
    if (excludes.includes(url) || excludes.includes(targetUrl)) {
      return true;
    }

    for (const item of menuArray) {
      if (item.buttonTag !== '1' && item.url) {
        urlArry.push(item.url);
      }
    }
    ret = (urlArry.includes(url) || urlArry.includes(targetUrl));
    return ret;
  }
}
