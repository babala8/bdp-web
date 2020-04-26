import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderManageService {
  private url = `${environment.SERVICE_URL}`;

  constructor(
    private http: HttpClient
  ) {}

  getOrderManage(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params: params});
  }

  /** 查询所有路线信息 */
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
  }

  // 查询当天可执行线路
  qryLineNoByDate(params):Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/qryLineNoByDate' ,{params: params});
  }

  // 查询任务单详情
  qryTaskDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  //查询操作记录
  qryOperateRecord(taskNo): Observable<any> {
    return this.http.get(this.url + `task/v2/task/operateRecord/${taskNo}`);
  }

  //自动分配线路
  distributeLine(params): Observable<any> {
    return this.http.get( this.url + 'line-center/v2/networkLineRunMap/temporaryArrange', {params:params});
  }

  // 手动分配线路
  distributeLines(params): Observable<any> {
    return this.http.post( this.url + 'task/v2/task/allotLine', params);
  }
}
