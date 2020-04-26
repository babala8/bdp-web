import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private url = `${environment.SERVICE_URL}`;
  constructor(
    private http: HttpClient
  ) { }

  /*
  后端无对应接口
  */
  getKeyGroup(params): Observable<any>{
    return this.http.get(`${this.url}channel-center/v2/keyGroup`,{params})
  }
  delKeyGroup(params): Observable<any>{
    return this.http.delete(`${this.url}channel-center/v2/keyGroup/${params}`)
  }
  modKeyGroup(params): Observable<any>{
    return this.http.put(`${this.url}channel-center/v2/keyGroup`,params)
  }
  addKeyGroup(params): Observable<any>{
    return this.http.post(`${this.url}channel-center/v2/keyGroup`,params)
  }

  getKeyInfo(params): Observable<any> {
    return this.http.get(this.url + 'channel-center/v2/key', {params:params});
  }

  addKeyInfo(params):Observable<any>{
    return this.http.post(this.url + 'channel-center/v2/key', params);
  }

  modKeyInfo(params):Observable<any>{
    return this.http.put(this.url + 'channel-center/v2/key', params);
  }

  delKeyInfo(no): Observable<any>  {
    return this.http.delete(this.url + 'channel-center/v2/key/' + no);
  }

  getKeyType(params): Observable<any>{
    return this.http.get(`${this.url}channel-center/v2/keyType`,{params})
  }

  delKeyType(params): Observable<any>{
    return this.http.delete(`${this.url}channel-center/v2/keyType/${params}`)
  }

  modKeyType(params): Observable<any>{
    return this.http.put(`${this.url}channel-center/v2/keyType`,params)
  }

  addKeyType(params): Observable<any>{
    return this.http.post(`${this.url}channel-center/v2/keyType`,params)
  }

}
