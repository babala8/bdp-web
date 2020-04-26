import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../session.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private http: _HttpClient,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const session = this.sessionService;
    if (session.isLoggedIn) {
      // login in;
      return true;
    } else if (session.canRetry) {
      // refresh browser;
      return new Promise((resolve) => {
        const tokenInfo = {
          'access_token': this.sessionService.token,
          'refresh_token': this.sessionService.refreshToken
        };
        this.http.get(`${environment.SERVICE_URL}user-center/v2/user/detail`).pipe(map(data => Object.assign(data, tokenInfo))
        ).subscribe((res: any) => {
          // 设置登录信息
          this.sessionService.userInfo = res;
          this.sessionService.setMenu();
          resolve(true);
        }, (err) => {
          console.log(err);
          // this.router.navigateByUrl(session.login_url);
          this.sessionService.gotoException();
          resolve(false);
        })
      });
    } else {
      // Store the attempted URL for redirecting
      this.router.navigate([session.login_url]);
      return false;
    }
  }
}
