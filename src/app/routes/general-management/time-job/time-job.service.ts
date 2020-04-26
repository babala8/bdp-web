import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeJobService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  /* 查询定时任务列表 */
  getJob(params): Observable<any> {
    return this.http.get(this.url + 'time-job/v2/job', {params:params});
  }

  /* 添加定时任务 */
  addJob(params):Observable<any>{
    return this.http.post(this.url + 'time-job/v2/job', params);
  }

  /* 修改定时任务 */
  modJob(params):Observable<any>{
    return this.http.put(this.url + 'time-job/v2/job', params);
  }

  /* 删除定时任务 */
  delJob(no): Observable<any>  {
    return this.http.delete(this.url + 'time-job/v2/job/' + no);
  }

  /* 分页查询定时任务日志 */
  getJobLog(params): Observable<any> {
    return this.http.get(this.url + 'time-job/v2/jobLog', {params:params});
  }
}
