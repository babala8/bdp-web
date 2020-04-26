import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SYS_CONS } from '../../../models/constant';

@Injectable()
export class LineDistanceService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    getClrCenterList(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/clrCenter', {
            params: { clrCenterType: SYS_CONS.CENTER_TYPES[0].no + '' }
        });
    }

    page(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/route', {params});
    }

    getDevsByClrNo(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/dev/clrCenter', {params});
    }

    // getClrCenterByClrNo(params): Observable<any> {
    //     return this.http.post(this.url + 'basic/clrCenter/getClrCenterByClrNo', params);
    // }

    getPathLinked(params): Observable<any> {
        return this.http.get(this.url + 'line-center/v2/route/linkPath', {params});
    }

    linkPath(params): Observable<any> {
        return this.http.post(this.url + 'line-center/v2/route/linkPath', params);
    }

    //not found zhangjs
    group(params): Observable<any> {
        return this.http.post(this.url + 'addnote/devPractice/updateDevGroupNo', params);
    } 

}
