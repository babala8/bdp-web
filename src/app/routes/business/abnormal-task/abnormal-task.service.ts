import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbnormalTaskService {
  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient){}

  qryTaskListByPage(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params});
  }

  // qryServiceList(params): Observable<any> {
  //   return this.http.get(this.url + 'product-center/v2/serviceInfo/qryOperate', {params});
  // }

  // 查询操作列表
  qryOperateList(params): Observable<any> {
    return this.http.get(this.url + 'product-center/v2/serviceInfo/qryOperate', {params});
  }

  // 查询所有人员
  qryOpoerator(params): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/user/addnotes', {params});
  }

  // 强制结束任务
  stopTaskForce(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/business/exceptionHanding', params);
  }

  // 手动操作任务单
  operateTask(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/business/exceptionHanding', params);
  }
}
