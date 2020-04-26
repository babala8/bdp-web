import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NetpointLineArrangeService {
    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    // 分页查询路线信息
    qryLinesByPage(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine/line', {params: params});
    }

    // 查询所有路线信息
    qryAllLine(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
    }

    // 查询网点线路信息
    qryNetLine(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLine/lineType', {params: params});
    }

    // 分页查询线路运行图
    qryRunMapByPage(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/lineRunMap', {params: params});
    }

    // 分页查询网点线路运行图
    qryNetworkRunMapByPage(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLineRunMap', {params: params});
    }

    // 生成线路运行图
    generateRunMap(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/lineRunMap', params);
    }

    // 生成网点线路运行图
    generateNetworkRunMap(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/networkLineRunMap', params);
    }

    // 删除加钞路线
    lineDel(no): Observable<any> {
        return this.http.delete(this.url + 'line-center/v2/devLine/line/' + no);
    }

    // 添加加钞路线
    lineAdd(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/devLine/line' , params);
    }

    // 修改加钞路线
    lineMod(params): Observable<any> {
        return this.http.put(this.url + 'line-center/v2/devLine/line' , params);
    }

    // 查询路线详情
    qryLinesDetail(no): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine/line/' + no);
    }

    qryLineRunMapDetail(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/lineRunMap/detail', {params: params});
    }

    qryNetworkLineRunMapDetail(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLineRunMap/detail', {params: params});
    }

    modLineRunMap(params): Observable<any> {
        return this.http.put(this.url + 'line-center/v2/lineRunMap', params);
    }

    modNetworkLineRunMap(params): Observable<any> {
        return this.http.put(this.url + 'line-center/v2/networkLineRunMap', params);
    }

    getLineRunMapRoute(params): Observable<any>{
        return this.http.get(this.url + 'line-center/v2/lineRunMap/route',  {params: params});
    }
}
