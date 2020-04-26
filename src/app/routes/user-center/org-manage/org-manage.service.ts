import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgManageService {

  private orgsUrl = `${environment.SERVICE_URL}`;
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  getOrgsByPage(params): Observable<any> {
    return this.http.get<any>(this.orgsUrl + 'channel-center/v2/org', { params });
  }

  getOrg(orgNo): Observable<any> {
    return this.http.get<any>(this.orgsUrl + 'channel-center/v2/org/' + orgNo);
  }

  addOrg(params) {
    return this.http.post(this.orgsUrl + 'channel-center/v2/org', params);
  }

  updateOrg(params): Observable<any> {
    return this.http.put(this.orgsUrl + 'channel-center/v2/org', params);
  }

  deleteOrg(id): Observable<any> {
    return this.http.delete(this.orgsUrl + 'channel-center/v2/org/' + id);
  }

  qryAllOrgTypes(): Observable<any> {
    return this.http.get(this.orgsUrl + 'channel-center/v2/org/grade');
  }

  // 查询网点营业时间
  qryOrgBusinessTime(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/org/orgBusinessTime/qryOrgBusinessTime', {params});
  }

  // 修改网点营业时间
  modOrgBusiness(params): Observable<any> {
    return this.http.put(this.url + 'channel-center/v2/org/orgBusinessTime/modOrgBusinessTime', params);
  }
}
