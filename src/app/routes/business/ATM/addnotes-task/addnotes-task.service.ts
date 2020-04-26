import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddnotesTaskService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    // 加钞任务单查询
    dispatchQry(params): Observable<any> {
        return this.http.get(this.url + 'task/v2/task', {params: params});
    }

    // 加钞任务单详细信息查询
    qryDetail(no): Observable<any> {
        return this.http.get(this.url + 'task/v2/task/' + no);
    }

    // 加钞任务单取消
    cancel(dispatchNo): Observable<any> {
        return this.http.put(this.url + 'task/v2/task/cancel/' + dispatchNo, {});
    }

    //not use
    // 加钞任务单删除
    // del(no): Observable<any> {
    //     return this.http.delete(this.url + 'addnote/v2/dispatch/' + no);
    // }

    export(params): Observable<any> {
        return this.http.get(this.url + 'task/v2/task/exportTask', {params: params});
    }

    qryUsersInAddNotesGroup(params) {
        return this.http.get(this.url + 'user-center/v2/user/addnotes');
    }

    //not use
    // qryUsersInAddNotesGroupForKey(params) {
    //     return this.http.post(this.url + 'system/user/qryUsersInAddNotesGroupForKey', params);
    // }

    //not use
    // qryUsersInAddNotesGroupForPwd(params) {
    //     return this.http.post(this.url + 'system/user/qryUsersInAddNotesGroupForPwd', params);
    // }

    // 分配人员
    assignTo(params): Observable<any> {
        return this.http.put(this.url + 'task/v2/task/operator', params);
    }

  /** 获取设备信息 */
  getDevInfos(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev', {params: params});
  }

  // 获取设备品牌
  getDevVenders(params): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/vendor', {params:params});
  }

  // 获取设备类型
  getDevCatalogs(): Observable<any>  {
    return this.http.get(this.url + 'channel-center/v2/dev/catalog');
  }

  // 查询加钞计划
  addnoteDetail(no): Observable<any> {
    return this.http.get(this.url + 'business/v2/plan/' + no);
  }

  // 查询产品详细信息
  getServiceDetail(serviceNo): Observable<any> {
    return this.http.get(this.url + `product-center/v2/serviceInfo/${serviceNo}`, {});
  }

  //查询操作记录
  qryOperateRecord(taskNo): Observable<any> {
    return this.http.get(this.url + `task/v2/task/operateRecord/${taskNo}`);
  }
}
