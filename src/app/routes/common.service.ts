import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  qryOrgDetail(orgNo): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/org/' + orgNo);
  }

  /** 获取任务单列表 */
  qryTaskList(params): Observable<any> {
    return this.http.get(this.url + 'task/v2/task', {params: params});
  }

  /** 修改任务单 */
  modTask(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task', params);
  }

  /** 批量更新任务单状态 */
  taskStatusBatch(params): Observable<any> {
    return this.http.put(this.url + 'task/v2/task/taskStatusBatch', params);
  }

  /** 查询任务单详情 */
  qryTaskDetail(taskNo): Observable<any> {
    return this.http.get(this.url + 'task/v2/task/' + taskNo);
  }


  /**
   * 下载数据批量导入模板
   * @param filename 服务器存储的模板文件名(含后缀)
   * @param savedName 存储在本地的
   * @param errorCallback 下载出错的回调函数
   */
  downloadTemplate(filename, savedName, errorCallback) {
    this.http.post(this.url + 'manage-center/v2/export/exportTemplatesExcel', `filename=${filename}`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }).subscribe((result) => {
      const contentType = 'application/octet-stream;charset=UTF-8';
      const blob = new Blob([result], {type: contentType});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fileName = savedName;
      a.href = url;
      a.download = fileName + '.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    }, (error) => {
      errorCallback(error);
    });
  }

}
