import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpecialRuleService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    page(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/rule', {params: params});
    }

    add(params): Observable<any> {
        return this.http.post(this.url + 'param-center/v2/rule', params);
    }

    modify(params): Observable<any> {
        return this.http.put(this.url + 'param-center/v2/rule', params);
    }

    detele(params): Observable<any> {
        return this.http.delete(this.url + 'param-center/v2/rule/' + params.ruleId);
    }

    detail(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/rule/' + params.ruleId);
    }
}
