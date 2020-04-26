import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { SYS_CONS } from '../../../models/constant';

@Injectable({
  providedIn: 'root'
})
export class ClearCenterService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  // 添加申请单信息
  addTask(params) {
    return this.http.post(this.url + 'task/v2/business/transfer', params);
  }

  //
  modTask(params) {
    return this.http.put(this.url + 'task/v2/business/transfer', params);
  }

  // 查询钞处申请单列表
  qryTaskListByPage(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params: params});
  }

  // 添加现金调出申请单
  addNotesReceipt(params) {
    return this.http.post(this.url + 'business/v2/notes/receipt', params);
  }

  // 查询调出单详情
  qryReceiptDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }

  // 添加现金调入申请单
  addNotesAllocation(params): Observable<any> {
    return this.http.post(this.url + 'task/v2/business/transfer', params);
  }

  // 修改现金调出申请单
  modNotesReceipt(params): Observable<any> {
    return this.http.put(this.url + 'business/v2/notes/receipt', params);
  }

  //查询操作记录
  qryOperateRecord(taskNo): Observable<any> {
    return this.http.get(this.url + `task/v2/task/operateRecord/${taskNo}`);
  }

  //查询金库列表
  qryCustomer(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/clrCenter',{params: params});
  }

}
