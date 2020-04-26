import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class LayoutService {
  sideBarShowFlag: boolean = true;
  private url = environment.SERVICE_URL;

  constructor(private _http: HttpClient) {
  }

  // 收藏快捷菜单
  saveMenu(params) {
    return this._http.post(this.url + 'user-center/v2/menuCollect', params);
  }

  // 查询快捷菜单
  qryQuickMenu(params) {
    return this._http.get(this.url + 'user-center/v2/menuCollect', {params});
  }
}
