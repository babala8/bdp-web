import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { Md5 } from 'ts-md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { SessionService } from '@core/session.service';


@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  url = environment.SERVICE_URL;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private _http: HttpClient,
    private _session: SessionService,
  ) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  get mobile() {
    return this.form.controls.mobile;
  }

  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  count = 0;
  interval$: any;
  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }
    this.loading = true;
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    const password = Md5.hashStr(this.password.value + 'messi').toString();
    const formData = new FormData();
    formData.append('username', this.userName.value);
    formData.append('password', password);
    this._http
      .post(`${this.url}auth/callback/login`, {
        username: this.userName.value,
        password: password,
      }).pipe(switchMap((tokenInfo): Observable<any> => {
        console.log(tokenInfo);
      if (tokenInfo['retCode'] !== '00') {
        this.msg.error('登陆失败，用户名或密码错误!');
        this.loading = false;
        return;
      }
      const token = {
        token: tokenInfo['access_token'],
        refreshToken: tokenInfo['refresh_token'],
      };
      this._session.verifyToken = token;
      return this._http.get(`${this.url}user-center/v2/user/detail`).pipe(map(data => Object.assign(data, tokenInfo)));
    }), catchError(e=>throwError(e))).subscribe((res: any) => {
      // 设置登录信息
      this.loading = false;
      this._session.userInfo = res;
      // this.reuseTabService.clear(); // 登录时清空路由复用信息
      // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
      this.startupSrv.load().then(() => {
        this._session.setMenu();
        this.router.navigateByUrl('/app/app2/home');
      });

    }, () => this.loading = false);

  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
