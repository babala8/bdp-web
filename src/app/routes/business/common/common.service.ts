import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  /** 查询通用业务申请单列表 */
  qryCommonApplyList(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', { params });
  }

  /** 查询产品详情（带参数详情） */
  qryServiceDetail(params): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${params}`, { params });
  }

  /** 添加自定义产品任务 */
  addCommonApply(params): Observable<any> {
    return this.http.post(this.url + 'business/v2/selfProduct', params);
  }

  /** 查询自定义产品列表 */
  qryServiceForUse(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/serviceForUse', {params});
  }

  /** 查询任务单详情 */
  qryDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }
}

