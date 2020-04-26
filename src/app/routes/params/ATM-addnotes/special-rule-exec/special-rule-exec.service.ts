import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpecialRuleExecService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    page(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/devRuleExec', {params: params});
    }

    add(params): Observable<any> {
        return this.http.post(this.url + 'param-center/v2/devRuleExec', params);
    }

    // modify(params): Observable<any> {
    //     return this.http.post(this.url + 'addnote/devRuleExec/mod', params);
    // }

    delete(params): Observable<any> {
        return this.http.delete(this.url + 'param-center/v2/devRuleExec', {params: params});
    }

    getDevInfos(params): Observable<any> {
        return this.http.get(this.url + 'channel-center/v2/dev/clrCenter', {params: params});
    }

    // qryAddnotesRuleByPage(params): Observable<any> {
    //     return this.http.post(this.url + 'addnote/addnotesRule/qry', params);
    // }

    qryAllRules(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/rule', {params: params});
    }
}
