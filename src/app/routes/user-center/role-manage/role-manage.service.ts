import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManageService {

  private url = environment.SERVICE_URL;

  constructor(private http: HttpClient) {

  }

  qryRolesByPages(params): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/role', { params });
  }

  //查询该机构级别及下属级别角色列表
  qryRoleByGrade(params): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/role/grade' , {params: params});
  }

  qryRoleDetailById(id): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/role/' + id);
  }

  qryAllMenuList(): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/menu');
  }

  addRole(params): Observable<any> {
    return this.http.post(this.url + 'user-center/v2/role', params);
  }

  modRole(params): Observable<any> {
    return this.http.put(this.url + 'user-center/v2/role', params);
  }

  delRole(id): Observable<any> {
    return this.http.delete(this.url + 'user-center/v2/role/' + id);
  }

}

