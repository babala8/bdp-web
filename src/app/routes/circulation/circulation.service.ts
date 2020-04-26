import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { SYS_CONS } from '../../models/constant';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * 物流中心
 */
export class CirculationService {
  private url = `${environment.SERVICE_URL}`;

  constructor(
    private http: HttpClient
  ) {}

  getDispatchCirculation(params): Observable<any> {
    return this.http.get(`${this.url}tauro/v2/taskProcess`, { params })
  }

  getDetailDispatchCirculation(params): Observable<any> {
    return this.http.get(`${this.url}tauro/v2/dispatch/detail`, { params })
  }

  /** 查询加钞计划分组下的线路 */
  getPlanGroupRoute(params): Observable<any> {
    return this.http.get(this.url + 'addnote/v2/group/route', { params: params });
  }

  /** 查询设备信息列表和是否已经加钞 */
  getDispatchDev(no): Observable<any> {
    return this.http.get(`${this.url}tauro/v2/taskProcess/${no}`);
  }

  /** 查询加钞计划分组下的线路 */
  getPlanReaderRoute(no): Observable<any> {
    return this.http.get(`${this.url}tauro/v2/taskProcess/coords/${no}`);
  }

  /** 获取金库信息 */
  getClrCenterByClrNo(no): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/clrCenter', {
      params: { clrCenterType: SYS_CONS.CENTER_TYPES[0].no + '' }
    });
  }

  getLineListByClrNo(clrCenterNo): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType', { params: { clrCenterNo } });
  }

  /** 分页查询押运人员排班信息 */
  getEscortByPage(params): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/schedule/escort`, {params});
  }

  /** 覆盖生成押运人员排班信息 */
  addEscort(params): Observable<any> {
    return this.http.post(`${this.url}user-center/v2/schedule/escort`, params);
  }

  /** 删除押运人员排班信息 */
  deleteEscort(no): Observable<any> {
    return this.http.delete(`${this.url}user-center/v2/schedule/escort/${no}`);
  }

  /** 调整押运人员排班信息 */
  modEscort(params): Observable<any> {
    return this.http.put(`${this.url}user-center/v2/schedule/escort`, params);
  }

  getOutSourcingList(params){
    return this.http.get(`${this.url}user-center/v2/outSourcing`, {params});
  }

  geCarList(params){
    return this.http.get(`${this.url}manage-center/v2/car`, {params});
  }

  /** 查询所有路线信息 */
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
  }

  exportOutLineRunMap(params): Observable<any>{
    return this.http.put(this.url+ 'user-center/v2/schedule/escort/export' ,params)
  }

  getReaderFlow(params): Observable<any>{
    return this.http.get(`${this.url}tauro/v2/readerInfoFlow`,{params})
  }
  delReaderFlow(params): Observable<any>{
    return this.http.delete(`${this.url}tauro/v2/readerInfoFlow/${params}`)
  }
  modReaderFlow(params): Observable<any>{
    return this.http.put(`${this.url}tauro/v2/readerInfoFlow`,params)
  }
  addReaderFlow(params): Observable<any>{
    return this.http.post(`${this.url}tauro/v2/readerInfoFlow`,params)
  }
  auditReaderFlow(params): Observable<any>{
    return this.http.post(`${this.url}tauro/v2/readerInfoFlow/audit`,params)
  }
  returnReaderFlow(params): Observable<any>{
    return this.http.post(`${this.url}tauro/v2/readerInfoFlow/return`,params)
  }

  /** 获取用户列表 */
  getUser(params): Observable<any>{
    return this.http.get(`${this.url}user-center/v2/user`,{params})
  }

  /** 查询加钞组人员 */
  qryUsersInAddNotesGroup(params) {
    return this.http.get(this.url + 'user-center/v2/user/addnotes');
  }

  getKeyDistribute(params): Observable<any> {
    return this.http.get(this.url + 'addnote/v2/dispatch', {params: params});
  }
}
