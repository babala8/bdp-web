import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServiceCenterService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }


  /** 查询服务对象列表 */
  qryCustomerDetail(): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/customer', {})
  }

  /** 添加产品信息 */
  addProduction(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo', params);
  }

  /** 改变产品启用废弃状态 */
  changeProductionStatus(params): Observable<any> {
    return this.http.put(this.url + 'product-center/v2/serviceInfo/status', params);
  }

  /** 管理产品状态 */
  statusManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/status', params);
  }

  /** 管理产品转换关系 */
  statusTransitionManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/statusConvert', params);
  }

  /** 查询模块列表 */
  qryModuleList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/modules', {params: params});
  }

  /** 管理产品下物品信息 */
  prodGoodsManage(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/serviceInfo/products', params);
  }

  /** 查询sku物品列表 */
  qryGoodsList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productProperty/product', {params});
  }

  /** 查询sku物品详情 */
  qryGoodsDetail(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productProperty/detail', {params});
  }

  /** 查询所有操作信息 */
  qryOperateList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productInfo/qryOperate', {params});
  }

  addGoods(params): Observable<any> {
    return this.http.post(this.url + 'product-center/v2/productProperty/product', params);
  }

  deleteGoods(no): Observable<any>  {
    return this.http.delete(this.url + 'product-center/v2/productProperty/' + no);
  }

  modGoods(params): Observable<any> {
    return this.http.put(this.url + 'product-center/v2/productProperty/product', params);
  }

  /** 查询所属分组 */
  getUpperGoodsNo(): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/productProperty/upperInfoList');
  }
}
