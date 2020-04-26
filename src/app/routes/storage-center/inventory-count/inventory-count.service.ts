import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

/**
 * 仓储中心-盘库
 */
@Injectable({
  providedIn: "root"
})
export class InventoryCountService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  getInventoryCountHistory(params): Observable<any> {
    return this.http.get(this.url + `storage/v2/goodManage/qryCheckProductLog`, { params: params });
  }

}
