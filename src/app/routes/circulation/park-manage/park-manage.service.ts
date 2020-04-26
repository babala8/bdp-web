import {Injectable} from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ParkManageService {
  private url = `${environment.SERVICE_URL}`;

  constructor(private http: HttpClient) {
  }

  getCarList(params): Observable<any> {
    return this.http.post(`${SERVICE_URL}pilotedParking/qryCarInfos`, params);
  }

  updateCarStatus(params):Observable<any> {
    return this.http.post(`${SERVICE_URL}security-center/v2/parkingManage`, params);

  }
}
