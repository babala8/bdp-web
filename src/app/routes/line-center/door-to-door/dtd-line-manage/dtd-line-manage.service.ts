import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DtdLineManageService {
    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    // 分页查询路线信息
    qryLinesByPage(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine', {params: params});
    }

    // 查询所有路线信息
    qryAllLine(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/networkLine/lineType' , {params: params});

    }

    // 删除加钞路线
    lineDel(no): Observable<any> {
        return this.http.delete(this.url + 'line-center/v2/devLine/' + no);
    }

    // 添加加钞路线
    lineAdd(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/devLine' , params);
    }

    // 修改加钞路线
    lineMod(params): Observable<any> {
        return this.http.put(this.url + 'line-center/v2/devLine' , params);
    }

    // 查询路线详情
    qryLinesDetail(no): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/devLine/' + no);
    }
}
