import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {
    }

    getUserByPage(params): Observable<any> {
        return this.http.get(`${this.url}user-center/v2/user`, {params});
    }

    getUser(no): Observable<any> {
        return this.http.get(`${this.url}user-center/v2/role/${no}`);
    }

    addUser(params): Observable<any> {
        return this.http.post(`${this.url}user-center/v2/user`, params);
    }

    updateUser(params): Observable<any> {
        return this.http.put(`${this.url}user-center/v2/user`, params);
    }

    deleteUser(no): Observable<any> {
        return this.http.delete(`${this.url}user-center/v2/user/${no}`);
    }

    resetPassword(params): Observable<any> {
        return this.http.put(`${this.url}user-center/v2/user/password`, params);
    }

    unlock(params): Observable<any> {
        return this.http.post(`${this.url}/unlock`, params);
    }

    resubmitUser(params): Observable<any> {
        return this.http.post(`${this.url}/resubmitUser`, params);
    }

    auditUser(params): Observable<any> {
        return this.http.post(`${this.url}/auditUser`, params);
    }

    /** 查询所有岗位信息 */
    getPost(): Observable<any> {
        return this.http.get(`${environment.SERVICE_URL}user-center/v2/post/all`);
    }

}
