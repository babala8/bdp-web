import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '@core/session.service';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { delayWhen, flatMap } from 'rxjs/operators';

/**
 * 这个拦截器要放到delon的SimpleInterceptor之前进行拦截，这样才可以下一次带token的时候是刷新之后的token,
 * 默认放掉refresh接口
 */
@Injectable()
export class DelayInterceptor implements HttpInterceptor {

  login: Boolean = true;

  constructor(
    private session: SessionService
  ) { }

  // 最初打算将401拦截，刷新token再进行retry请求，但是考虑到可能会同时存在多个http请求，所以抛弃这种方式，采用定时刷新token，并在此时阻塞其他http请求
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  // 尝试将401结果拦截下来,刷新token后再进行retry请求
    // next.handle(req).pipe(retryWhen(errors => {
    //   const subject=new Subject();
    //   errors.subscribe(()=>{
    //     // huoqutoken
    //     this.http.post(environment.SERVICE_URL + 'auth/callback/refresh', this.session.refreshToken)
    //       .subscribe(result => {
    //         if (result['retCode'] != 'FF') {
    //           return subject.thrownError(errors);
    //         }
    //         subject.next(1);
    //       }, err => {
    //         subject.thrownError(errors);
    //       })
    //   });
    //   return subject.asObservable();
    // })).pipe(
    //   switchMap(event => {
    //     console.log(event);
    //     return of(event);
    //   }),
    // );

    if (!this.session.refreshTokenFlag || req.url === environment.SERVICE_URL + 'auth/callback/refresh') {
      return next.handle(req);
    } else {
      return of(1).pipe(delayWhen((value, index) => {
        return this.session.refreshComplete$;
      })).pipe(flatMap(() => next.handle(req)));
    }

  }
}
