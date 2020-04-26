import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * 服务商管理
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  /** 获取设备维护商列表 */
  getDevCompanys(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/company', { params:params });
  }

  /** 删除设备维护商 */
  delDevCompanys(no): Observable<any> {
    return this.http.delete(this.url + 'channel-center/v2/dev/company/'+ no);
  }

  /** 添加设备维护商 */
  addDevCompanys(params): Observable<any> {
    return this.http.post(this.url + 'channel-center/v2/dev/company',params);
  }

  /** 修改设备维护商 */
  modDevCompanys(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/dev/company',params);
  }

  /** 查询服务商列表 */
  qryProviderList(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/company', {params});
  }

  /** 添加服务商 */
  addProvider(params): Observable<any> {
    return this.http.post(this.url + 'channel-center/v2/dev/company', params);
  }
  /** 修改服务商 */
  modProvider(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/dev/company', params);
  }
  /** 删除服务商 */
  delProvider(providerNo): Observable<any> {
    return this.http.delete(this.url + `channel-center/v2/dev/company/${providerNo}`);
  }

  /** 批量添加服务商信息 */
  addProviderMutiple(params): Observable<any> {
    return this.http.post(this.url + 'channel-center/v2/dev/company/import', params);
  }
}
