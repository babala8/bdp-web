import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarnMessageService {

  private url = `${environment.SERVICE_URL}`;
  constructor(private http: HttpClient) { }

  getPushLog(params): Observable<any> {
    return this.http.get(this.url + 'push-server/v2/pushServer', {params:params});
  }
}
