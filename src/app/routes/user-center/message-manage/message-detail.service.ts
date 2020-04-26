import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageDetailService {

  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  qryMessage(params): Observable<any> {
    return this.http.get(this.url + 'push-server/v2/pushServer', {params: params});
  }

}
