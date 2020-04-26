import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThingsService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  /** 分页查询容器信息 */
  qryContainerList(params): Observable<any> {
    return this.http.get(this.url + 'manage-center/v2/container', {params:params});
  }

  /** 新增容器信息 */
  addContainer(params):Observable<any>{
    return this.http.post(this.url + 'manage-center/v2/container', params);
  }

  /** 删除容器信息 */
  delContainer(no): Observable<any>  {
    return this.http.delete(this.url + 'manage-center/v2/container/' + no);
  }

  /** 修改容器信息 */
  modContainer(params):Observable<any>{
    return this.http.put(this.url + 'manage-center/v2/container', params);
  }

  /** 批量添加容器信息 */
  addContainerMutiple(params): Observable<any> {
    return this.http.post(this.url + 'manage-center/v2/container/import', params);
  }

  /** 查询标签信息列表 */
  getTag(params): Observable<any>{
    return this.http.get(`${this.url}manage-center/v2/tag`,{params})
  }

  /** 删除标签 */
  delTag(params): Observable<any>{
    return this.http.delete(`${this.url}manage-center/v2/tag/${params}`)
  }

  /** 修改标签 */
  modTag(params): Observable<any>{
    return this.http.put(`${this.url}manage-center/v2/tag`,params)
  }

  /** 增加标签 */
  addTag(params): Observable<any>{
    return this.http.post(`${this.url}manage-center/v2/tag`,params)
  }

  /** 批量添加标签信息 */
  addTagMutiple(params): Observable<any> {
    return this.http.post(this.url + 'manage-center/v2/tag/import', params);
  }

  /** 分页查询手持机信息 */
  getTagReader(params): Observable<any>{
    return this.http.get(`${this.url}manage-center/v2/tagReader`,{params})
  }

  /** 删除手持机 */
  delTagReader(params): Observable<any>{
    return this.http.delete(`${this.url}manage-center/v2/tagReader/${params}`)
  }

  /** 修改手持机 */
  modTagReader(params): Observable<any>{
    return this.http.put(`${this.url}manage-center/v2/tagReader`,params)
  }

  /** 增加手持机 */
  addTagReader(params): Observable<any>{
    return this.http.post(`${this.url}manage-center/v2/tagReader`,params)
  }

  /** 查询机构详情 */
  getOrg(orgNo): Observable<any> {
    return this.http.get<any>(this.url + 'channel-center/v2/org/' + orgNo);
  }

  /** 获取设备品牌 */
  getDevVenders(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/vendor', {params:params});
  }

  /** 产品基础信息详情查询 */
  getProductAttribute(productNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/productProperty/detail`, {params: {productNo}});
  }
}
