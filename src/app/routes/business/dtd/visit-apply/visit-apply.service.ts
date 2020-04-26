import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VisitApplyService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {

  }

  // 分页查询上门预约信息
  qryVisitOrderByPage(params): Observable<any> {
    return this.http.get(this.url + 'business/v2/visitOrder', { params: params });
  }

  // 添加上门预约信息
  addVisitOrder(params): Observable<any> {
    return this.http.post(this.url + 'business/v2/visitOrder', params);
  }

  // 修改上门预约信息
  modVisitOrder(params): Observable<any> {
    return this.http.put(this.url + 'business/v2/visitOrder', params);
  }

  // 删除上门预约信息
  delVisitOrder(params): Observable<any> {
    return this.http.delete(this.url + 'business/v2/visitOrder',{ params: params });
  }

  //审核预约
  auditVisitOrder(params): Observable<any> {
    return this.http.put(this.url + 'business/v2/visitOrder/audit',params);
  }

  // 查询上门预约信息详情
  qryVisitOrderList(): Observable<any> {
    return this.http.get(this.url + 'business/v2/visitOrder/orderCustomers',{});
  }

}
