import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceManageService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  /** 分页查询产品信息 */
  serviceInfo(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo', {params:params});
  }

  /** 查询服务对象列表 */
  qryCustomerTypeList(): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/customer', {})
  }

  /** 查询物品列表 */
  qryProductList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productProperty/product', {params});
  }

  /** 管理产品下物品信息 */
  ServiceProductManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/product', params);
  }

  /** 查询模块列表 */
  qryModuleList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/modules', {params: params});
  }

  /** 查询所有操作信息 */
  qryOperateList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/qryOperate', {params});
  }

  /** 改变产品启用废弃状态 */
  changeServiceStatus(params): Observable<any> {
    return this.http.put(this.url + 'product-center/v2/serviceInfo/status', params);
  }

  /** 管理产品转换关系 */
  statusTransitionManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/statusConvert', params);
  }

  /** 管理产品状态 */
  statusManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/status', params);
  }

  // 添加产品
  addservice(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo', params);
  }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  /** 查询sku物品详情 */
  qryProductDetail(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productProperty/detail', {params});
  }

  /** 修改服务基本信息 */
  modServiceBaseInfo(params): Observable<any> {
    return this.http.put(this.url + 'product-center/v2/serviceInfo/mod', params);
  }

  /** 修改服务状态信息 */
  modServiceStatusInfo(params): Observable<any> {
    return this.http.put(this.url + 'product-center/v2/serviceInfo/modStatus', params);
  }
}
