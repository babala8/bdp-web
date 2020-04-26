import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LockService {
  private lockUrl = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) {}

  // 查询锁具信息
  getLockInfo(params) {
    return this.http.get(this.lockUrl + 'lock/v2/lock', {params:params});
  }

  modLock(params) {
    return this.http.put(this.lockUrl + 'lock/v2/lock', params);
  }

  addLock(params) {
    return this.http.post(this.lockUrl + 'lock/v2/lock', params);
  }
  delLock(no) {
    return this.http.delete(this.lockUrl + 'lock/v2/lock/' + no);
  }

  // 查询锁具日志
  getLockLog(params) {
    return this.http.get(this.lockUrl + 'lock/v2/lockTrans', {params:params});
  }

  // 查询锁具状态
  getLockMonitor(params) {
    return this.http.get(this.lockUrl + 'lock/v2/lockStatus', {params:params});
  }

  // 查询设备列表
  getAllDevInfo(params) {
    return this.http.get(environment.SERVICE_URL + 'channel-center/v2/dev/clrCenter', {params:params});
  }

}
