import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SessionService } from '@core/session.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, filter, mergeMap } from 'rxjs/operators';
import { RET_CODE } from '../../models/constant';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private msgChange$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  login: Boolean = true;

  constructor(private injector: Injector, private session: SessionService, private http: HttpClient) {
    this.msgChange$.pipe(debounceTime(1000), filter(value => !!value)).subscribe(
      msg => this.msg.error(msg),
    );
  }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    // setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    this.session.gotoException();
  }

  private checkStatus(ev: HttpResponseBase, req) {
    if (ev.status >= 200 && ev.status < 300) return;

    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector.get(NzNotificationService).error(
      `请求错误 ${ev.status}: ${ev.url}`,
      errortext,
    );
  }

  private handleData(ev: HttpResponseBase, req): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    if (ev.status > 0) {
      this.injector.get(_HttpClient).end();
    }
    this.checkStatus(ev, req);
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
          const body: any = ev.body;
          if (body && body.retCode !== RET_CODE.SUCCESS) {
            this.msg.error(body.retMsg);
            // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
            return throwError(ev);
          } else {
            // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
            // return of(new HttpResponse(Object.assign(event, { body: body.response })));
            // 或者依然保持完整的格式
            return of(ev);
          }
        }
        break;
      case 401: // 未登录状态码
        // 请求错误 401: https://preview.pro.ant.design/api/401 用户没有权限（令牌、用户名、密码错误）。
        (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
        this.goTo('/zijin-exception/401');
        break;
      case 403:
      case 404:
      case 500:
        // this.goTo(`/exception/${ev.status}`);
        if (ev instanceof HttpResponse) {
          this.msg.error(ev.body.message);
        }
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  // 处理错误信息
  private handleError(event: HttpResponse<any> | HttpErrorResponse, req): Observable<any> {
    switch (event.status) {
      case 200:
        break;
      case 401: // 未登录状态码
        this.msg.error('登录信息失效，请重新登录');
        this.injector.get(_HttpClient).end();
        this.goTo('/zijin-exception/401');
        break;
      case 0:
        this.msgChange$.next('服务器连接异常');
        break;
      case 403:
        this.msg.error('接口权限不足');
        break;
      case 404:
      case 500:
        // this.goTo(`/${event.status}`);
        this.msg.error('页面加载失败，接口出错500');
        break;
      case 900:
      case 901:
        // this.goTo(this.session.login_url);
        this.msg.error('网络连接失败，未能连接到服务器');
        break;
    }
    return throwError(event);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    const serviceUrl = environment.SERVICE_URL;
    const loginUrl = serviceUrl + 'auth/callback/login';
    const refreshUrl = serviceUrl + 'auth/callback/refresh';
    const downloadTemplateUrl = serviceUrl + 'manage-center/v2/export/exportTemplatesExcel';
    const url = req.url;
    let newReq;
    if (url === refreshUrl) {
      newReq = req.clone({ url, setHeaders: { Authorization: '' } });
    } else {
      newReq = req.clone({ url });
    }
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        console.log(event, url);
        if (event instanceof HttpResponse && url.startsWith(serviceUrl) && url !== loginUrl && url !== refreshUrl && url !== downloadTemplateUrl) {
          // if (event.body)
          return this.handleData(event, req);
        }
        return of(event);
        // 若一切都正常，则后续操作
      }), catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(err);
        }
        return this.handleError(err, newReq);
      }),
    );
  }
}
