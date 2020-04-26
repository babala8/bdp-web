import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SysParamsService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) {

  }

  /* 修改参数信息 */
  updateParamInfo(params): Observable<any> {
    return this.http.put(this.url + 'param-center/v2/paramManage', params);
  }

  /* 分页查询参数列表 */
  qryParamInfoList(params): Observable<any> {
    return this.http.get(this.url + 'param-center/v2/paramManage', { params });
  }

  /* 添加系统参数 */
  addParam(params): Observable<any> {
    return this.http.post(this.url + 'param-center/v2/paramManage', params);
  }

  /* 查询所有参数类型 */
  qryParamTypeList(): Observable<any> {
    return this.http.get(this.url + 'param-center/v2/paramManage/type');
  }

  /* 删除系统参数 */
  deleteParamById(id): Observable<any> {
    return this.http.delete(this.url + 'param-center/v2/paramManage/' + id);
  }
}
