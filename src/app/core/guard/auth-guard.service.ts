import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/guard/auth.service';
import { SessionService } from 'app/core/session.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private session: SessionService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.session.isLoggedIn) {
      return this._checkPermission(this._getUrl(route), state.url);
    }
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  /**
   * 判断当前用户是否为授权用户
   **/
  private _checkPermission(url?: string, targetUrl?: string): boolean {
    // TODO: 将任务代理给AuthService执行
    return this.authService.checkPermission(url, targetUrl);
  }

  /**
   * 根据路由获得解析前的URL
   * @param route
   * @returns {string}
   * @private
   */
  private _getUrl(route) {
    let next = this._getTruthRoute(route);
    const segments = [];
    while (next) {
      next.routeConfig && segments.push(next.routeConfig.path);
      next = next.parent;
    }
    const url = '/' + segments.filter(function (i) {
      return i;
    }).reverse().join('/');
    return url;
  }

  private _getTruthRoute(route) {
    let next = route;
    while (next.firstChild)
      next = next.firstChild;
    return next;
  }
}
