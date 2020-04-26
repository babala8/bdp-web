import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpecialDateService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    page(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/spDateCoeff', {params: params});
    }

    add(params): Observable<any> {
        return this.http.post(this.url + 'param-center/v2/spDateCoeff', params);
    }

    modify(params): Observable<any> {
        return this.http.put(this.url + 'param-center/v2/spDateCoeff', params);
    }

    delete(params): Observable<any> {
        return this.http.delete(this.url + 'param-center/v2/spDateCoeff', {params: params});
    }

}
