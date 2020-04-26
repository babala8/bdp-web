import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralManagementService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) {

  }

  /* 车辆信息查询 */
  getArmoredCar(params): Observable<any> {
    return this.http.get(this.url + 'manage-center/v2/car', {params:params});
  }

  /* 添加车辆信息 */
  addArmoredCar(params):Observable<any>{
    return this.http.post(this.url + 'manage-center/v2/car', params);
  }

  /* 修改车辆信息 */
  modArmoredCar(params):Observable<any>{
    return this.http.put(this.url + 'manage-center/v2/car', params);
  }

  /* 删除车辆 */
  delArmoredCar(no): Observable<any>  {
    return this.http.delete(this.url + `manage-center/v2/car/${no}`);
  }

  /* 批量导入车辆信息 */
  addCarMutiple(params): Observable<any> {
    return this.http.post(this.url + 'manage-center/v2/car/import', params);
  }

  /* 查询服务商 */
  qryProviderList(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/dev/company', {params});
  }

  /* 按条件查询金库信息 */
  getAllClrCenterInfos(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/clrCenter', {params});
  }

  // 获取金库下所有网点
  getNetpointsByClrNo(params): Observable<any> {
    return this.http.post(this.url + '/getNetpointsByClrNo', params);
  }

  // 金库下添加关联机构
  addOrgsToClrCenter(params): Observable<any> {
    return this.http.post(this.url + '/addOrgsToClrCenter', params);
  }

  // 查询未关联金库的所有机构
  getOrgsWithNoClrCenter(params): Observable<any> {
    return this.http.post(this.url + '/getOrgsWithNoClrCenter', params);
  }

  /* 修改金库参数 */
  updateCenterNum(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/clrCenter/updateCenterNum', params);
  }

  /* 分页查询外包人员信息列表 */
  qryExternalPeopleList(params): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/outSourcing', {params});
  }

  /* 添加外包人员 */
  addExternalPeople(params): Observable<any> {
    return this.http.post(this.url + 'user-center/v2/outSourcing', params);
  }

  /* 修改外包人员 */
  modExternalPeople(params): Observable<any> {
    return this.http.put(this.url + 'user-center/v2/outSourcing', params);
  }

  /* 删除外包人员 */
  delExternalPeople(providerNo): Observable<any> {
    return this.http.delete(this.url + `user-center/v2/outSourcing/${providerNo}`);
  }

  /* 批量导入外包人员信息 */
  addExternalPeopleMutiple(params): Observable<any> {
    return this.http.post(this.url + 'user-center/v2/outSourcing/import', params);
  }
}
