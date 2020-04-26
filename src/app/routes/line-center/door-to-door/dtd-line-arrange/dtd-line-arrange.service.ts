import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class DtdLineArrangeService {
    //status用来控制页面执行修改操作后的刷新与否
    status = false;

    private url = `${environment.SERVICE_URL}`;


    constructor(private http: HttpClient) {
    }

    getDtdByPage(params): Observable<any> {
        return this.http.get(`${this.url}line-center/v2/onSiteCollection`, {params});
    }

    getDetail(params): Observable<any> {
        return this.http.get(`${this.url}line-center/v2/onSiteCollection/details`, {params});
    }

    generateLineRun(params): Observable<any> {
        return this.http.post(`${this.url}line-center/v2/onSiteCollection/lineRun`, params);
    }

    modLineRunMap(params): Observable<any> {
        return this.http.put(`${this.url}line-center/v2/onSiteCollection/lineRun`, params);
    }
    // 查询所有路线信息
    qryAllLine(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});
    }
}
