import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MenuManageService{
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }
  qryAllMenuList(params): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/menu`,{params});
  }

  qryMenuDetail(no): Observable<any> {
    return this.http.get( `${this.url}user-center/v2/menu/menu/${no}`);
  }

  delMenu(no): Observable<any> {
    return this.http.delete(`${this.url}user-center/v2/menu/menu/${no}`);
  }

  addMenu(params): Observable<any> {
    return  this.http.post( `${this.url}user-center/v2/menu`,params);
  }

  modifyMenu(params): Observable<any> {
    return this.http.put(`${this.url}user-center/v2/menu`,params);
  }

  qryInterface(no): Observable<any> {
    return this.http.get(`${this.url}user-center/v2/menu/${no}`);
  }
}
