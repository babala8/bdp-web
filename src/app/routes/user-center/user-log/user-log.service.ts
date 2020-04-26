import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  getUserLog(params): Observable<any> {
    return this.http.get(this.url + 'user-center/v2/userLog', {params:params});
  }
}
