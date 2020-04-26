import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayLineService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {

  }

  // 分页查询路线信息
  qryLinesByPage(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType', { params: params });
  }

  // 查询所有路线信息
  qryAllLine(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLine/lineType', { params: params });

  }

  // 按类型查询线路
  qryLineByType(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/devLine', { params: params });
  }

  //todo
  adjust(params): Observable<any> {
    return this.http.put(this.url + 'line-center/v2/HolidayLineRunMap', params);
  }

  // 分页查询网点线路运行图
  qryNetworkRunMapByPage(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLineRunMap', {params: params});
  }

  qryNetworkLineRunMapDetail(params): Observable<any> {
    return this.http.get(this.url + 'line-center/v2/networkLineRunMap/detail', {params: params});
  }

  modNetworkLineRunMap(params): Observable<any> {
    return this.http.put(this.url + 'line-center/v2/networkLineRunMap', params);
  }
}
