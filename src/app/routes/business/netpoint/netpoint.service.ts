import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NetPointService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  // 分页查询调拨任务单
  page(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', { params: params });
  }

  // 网点寄库解现申请
  addAllocation(params): Observable<any> {
    return this.http.post(this.url + 'task/v2/business/transfer', params);
  }
  // 网点寄库解现申请修改
  modAllocation(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/business/transfer', params);
  }

  //网点领现申请
  // addReceipt(params): Observable<any> {
  //   return this.http.post(this.url + 'task/v2/business/receipt', params);
  // }

  // 删除调拨任务单
  delete(no): Observable<any> {
    return this.http.delete(this.url + 'task/v2/task/' + no, {});
  }

  // 审核网点寄库解现申请
  audit(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task/audit', params);
  }

  // 查询任务单详情
  qryTaskDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }

  // 查询机构详情
  qryOrgDetail(orgNo): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/org/' + orgNo);
  }

  // 查询机构现金箱列表
  qryCashBoxListOfOrg(orgNo): Observable<any> {
    return this.http.get(this.url + 'manage-center/v2/container/qryContainerNoList/' + orgNo);
  }

  // 订单拆分
  splitAllocation(params): Observable<any> {
    return this.http.post(this.url + 'task/v2/task/split', params);
  }

  // 订单合并
  mergeAllocation(params): Observable<any> {
    return this.http.post(this.url + 'task/v2/task/merge', params);
  }

  // 查询清分中心下所有线路
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
  }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  //查询操作记录
  qryOperateRecord(taskNo): Observable<any> {
    return this.http.get(this.url + `task/v2/task/operateRecord/${taskNo}`);
  }
}
