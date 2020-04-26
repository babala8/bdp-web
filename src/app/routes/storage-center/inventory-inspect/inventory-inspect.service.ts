import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * 仓储中心-查库
 */
export class InventoryInspectService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  /** 获取查库历史记录 */
  getInventoryInspectHistory(params): Observable<any> {
    return this.http.get(this.url + 'storage/v2/goodManage/qryCheckBagsLog', { params: params });
  }
}
