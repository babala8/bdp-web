import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DevSelectParamsService {

    private url = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient) {

    }

    getDevConfig(params): Observable<any> {
        return this.http.get(this.url + 'param-center/v2/devConfig/' + params.clrCenterNo);
    }

    devConfig(params): Observable<any> {
        return this.http.put(this.url + 'param-center/v2/devConfig', params);
    }

}
