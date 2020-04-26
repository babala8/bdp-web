import {Injectable} from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * 渠道中心
 */
export class ChannelCenterService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  /** 查询金库信息 */
  getClrCenterByClrNo(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/clrCenter', {params});
  }

  /** 查询所有线路 */
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType', {params: params});
  }

  /** 查询所有维护商 */
  qryDevServiceCompany(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/company', {params: params});
  }

  /** 获取设备信息 */
  getDevInfos(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev', {params: params});
  }

  getDevCatalogs(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/catalog');
  }

  getDevDetail(params): Observable<any>  {
    return this.http.post(this.url + '/qryDevInfoDetail', params);
  }

  addDev(params): Observable<any>  {
    return this.http.post(this.url + 'channel-center/v2/dev', params);
  }
  modDev(params): Observable<any>  {
    return this.http.put(this.url + 'channel-center/v2/dev', params);
  }
  delDev(no): Observable<any>  {
    return this.http.delete(this.url + 'channel-center/v2/dev/' + no);
  }

  /** 手动训练 */
  practice(params): Observable<any> {
    return this.http.post(this.url +  'addnote/devPractice/practiceByDev', params);
  }

  /** 查询设备清机周期信息 */
  qryDevClrTime(no): Observable<any> {
    return this.http.get(this.url + `channel-center/v2/dev/` + no);
  }

  /** 修改设备清机周期信息 */
  modDevClrTime(params): Observable<any> {
    return this.http.put(this.url + 'business/v2/modDevClrTime', params);
  }

  getDevTypes(params) {
    return this.http.get(this.url + 'channel-center/v2/dev/type', {params:params});
  }

  modDevTypes(params) {
    return this.http.put(this.url + 'channel-center/v2/dev/type', params);
  }

  addDevTypes(params) {
    return this.http.post(this.url + 'channel-center/v2/dev/type', params);
  }
  delDevTypes(no) {
    return this.http.delete(this.url + 'channel-center/v2/dev/type/' + no);
  }

  getDevCatalog(params) {
    return this.http.get(this.url + 'channel-center/v2/dev/catalog', {params: params});
  }
  getDevVenders(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/vendor', {params:params});
  }

  delDevVendors(no): Observable<any> {
    return this.http.delete(this.url + 'channel-center/v2/dev/vendor/'+ no );
  }

  addDevVendors(params): Observable<any>  {
    return this.http.post(this.url + 'channel-center/v2/dev/vendor',  params);
  }

  modDevVendors(params): Observable<any>  {
    return this.http.put(this.url + 'channel-center/v2/dev/vendor', params);
  }

  /** 获取机构 */
  getOrg(orgNo): Observable<any> {
    return this.http.get<any>(this.url + 'channel-center/v2/org/' + orgNo);
  }

  /** 分页查询客户类型 */
  getCallCustomerTypes(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/callCustomer/type', {params:params});
  }

  /** 查询所有客户类型 */
  getCallCustomerTypeList(): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/callCustomer/typeList');
  }

  getCallCustomers(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/callCustomer', {params:params});
  }

  modCallCustomers(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/callCustomer', params);
  }

  addCallCustomers(params): Observable<any> {
    return this.http.post(this.url + 'channel-center/v2/callCustomer', params);
  }

  delCallCustomers(no): Observable<any> {
    return this.http.delete(this.url + `channel-center/v2/callCustomer/${no}`);
  }

  /** 查询上门收款周期信息 */
  qryCallCustomerClrTime(params): Observable<any> {
    return this.http.get(this.url + `channel-center/v2/callCustomerTime/${params}`, {});
  }

  /** 修改上门收款周期信息 */
  modCallCustomerClrTime(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/modCallCustomerTime', params);
  }
}
