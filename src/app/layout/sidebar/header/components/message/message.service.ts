import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  qryMessages(params): Observable<any> {
    return this.http.get(this.url + 'push-server/v2/pushServer', {params: params});
  }

  qryMessageByNo(no): Observable<any> {
    return this.http.get(this.url + 'push-server/v2/pushServer/no' , {params: no});
  }
}
