import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityWarningService {
    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {}

    // 查询预警信息
    getSecurityWarnInfo(params) {
        return this.http.get(this.url + 'security-center/v2/securityWarn', {params:params});
    }
    //获取用户列表
    getUser(params): Observable<any>{
        return this.http.get(`${this.url}user-center/v2/user`,{params})
    }

}
