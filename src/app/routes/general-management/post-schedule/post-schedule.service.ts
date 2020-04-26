import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostScheduleService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) { }

  getPostByPage(params): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/post`, { params });
  }

  addPost(params): Observable<any> {
    return this.http.post(`${this.url}user-center/v2/post`, params);
  }

  deletePost(no): Observable<any> {
    return this.http.delete(`${this.url}user-center/v2/post/${no}`);
  }

  modPost(params): Observable<any> {
    return this.http.put(`${this.url}user-center/v2/post`, params);
  }

  getPostDetail(postNo): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/post/detail`, { params: { postNo } });
  }

  getAllPost(): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/post/all`);
  }

  //查询模板信息
  getPostScheduleInfo(params) {
    return this.http.get(`${this.url}user-center/v2/schedule/postScheduleMould`, {params:params});
  }

  //获取人员列表
  getUserInfo(params): Observable<any>{
    return this.http.get(`${this.url}user-center/v2/post/qryUserInfo`, {params:params});
  }

  //删除模板
  delPostSchedule(no): Observable<any> {
    return this.http.delete(this.url + 'user-center/v2/schedule/postScheduleMould/' + no);
  }

  //增加模板
  addPostMould(params): Observable<any>{
    return this.http.post(`${this.url}user-center/v2/schedule/postScheduleMould`,params);
  }

  //修改模板
  modPostMould(params): Observable<any>{
    return this.http.put(`${this.url}user-center/v2/schedule/postScheduleMould`,params);
  }

  //查询排班计划信息
  getPostSchedulePlan(params) {
    return this.http.get(`${this.url}user-center/v2/schedule/postSchedule`, {params:params});
  }

  //获取模板列表
  getMouldInfo(params): Observable<any>{
    return this.http.get(`${this.url}user-center/v2/schedule/postScheduleMould/all`, {params:params});
  }

  //删除排班计划
  delPostSchedulePlan(no): Observable<any> {
    return this.http.delete(this.url + 'user-center/v2/schedule/postSchedule/' + no);
  }

  //增加排班计划
  addPostSchedulePlan(params): Observable<any>{
    return this.http.post(`${this.url}user-center/v2/schedule/postSchedule`,params);
  }

  //修改排班计划
  modPostSchedulePlan(params): Observable<any>{
    return this.http.put(`${this.url}user-center/v2/schedule/postSchedule`,params);
  }
}
