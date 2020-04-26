import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceCenterService {

    private businessUrl = `${environment.SERVICE_URL}accounts-center/v2/`;

    constructor(private http: HttpClient) {}

    // 查询交易信息
    getBusinessInfo(params) {
        return this.http.get(this.businessUrl + 'biztxlog', {params:params});
    }

}
