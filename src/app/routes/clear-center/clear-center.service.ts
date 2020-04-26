import {Injectable} from '@angular/core';

import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearCenterService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  /** 清点 */
  inventory(params): Observable<any> {
    return this.http.post(this.url + 'clear-center/v2/cashBusiness/inventory', params);
  }

  /** 查询领现单详情 */
  qryReceiptDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }

  qryOrgDetail(orgNo): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/org/' + orgNo);
  }

  /** 获取出库任务单列表 */
  getGoodOutOrder(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params:params});
  }

  /** 获取任务信息 */
  qryTaskInfo(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/bankNote', {params:params});
  }

  /** 根据任务单编号查询总金额 */
  getAmountByTaskNo(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/loadNote', {params:params});
  }

  /** 查询清分机列表 */
  qryCountTaskNum(): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/count/qryCountTaskNum', );
  }

  /** 清分机分配 */
  clearDevDistribute(params): Observable<any> {
    return this.http.post(this.url + 'channel-center/v2/dev/count/allotCount', params);
  }

  /** 批量出库（往物流） */
  outWarehouseBatch(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task/taskStatusBatch',params);
  }

  /** 领现配款（2019-08-16） */
  loadNote(params): Observable<any> {
    return this.http.post(this.url + 'clear-center/v2/cashBusiness/loadNote', params);
  }

  /** 查询容器所属任务单信息 */
  qryTaskDetailByContainer(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/qryBycontainerNo', {params: params});
  }

  /** 分页查询调拨任务单 */
  page(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', { params: params });
  }

  /** 查询清分中心下所有线路 */
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
  }


  getDetailAtmCash(no) :Observable<any>{
    return this.http.get(`${this.url}task/v2/task/loadNote/${no}`)
  }

  getAtmCash(params): Observable<any>{
    return this.http.get(`${this.url}task/v2/task/loadNote`,{params})
  }

  /**钞处中心待执行任务信息查询 */
  getTaskInfo(params): Observable<any> {
    return this.http.get(`${this.url}task/v2/task/bankNote`, { params: params });
  }

  /**查询清点任务单金额 */
  getLoadCheck(params): Observable<any> {
    return this.http.get(`${this.url}task/v2/task/loadCheckNote`, { params: params } );
  }

  /**查询清分机正在执行情况 */
  getInventory(): Observable<any> {
    return this.http.get(`${this.url}channel-center/v2/dev/count/qryCountTaskNum`);
  }

  /**分配清分机 */
  distribute(params): Observable<any> {
    return this.http.post(`${this.url}channel-center/v2/dev/count/allotCount`, params);
  }


  qryDevCountStatus(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/count/devConMonitoring', {params:params});
  }

  getDevCount(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/count', {params:params});
  }

  delDevCount(no): Observable<any> {
    return this.http.delete(this.url + 'channel-center/v2/dev/count/'+ no );
  }

  addDevCount(params): Observable<any>  {
    return this.http.post(this.url + 'channel-center/v2/dev/count',  params);
  }

  modDevCount(params): Observable<any>  {
    return this.http.put(this.url + 'channel-center/v2/dev/count', params);
  }

  getDetailAtmInventory(taskNo) :Observable<any>{
    return this.http.get(`${this.url}clear-center/v2/cashBusiness/inventory/${taskNo}`)
  }

  getAtmInventory(params): Observable<any>{
    return this.http.get(`${this.url}task/v2/task/loadCheckNote`,{params})
  }

}
