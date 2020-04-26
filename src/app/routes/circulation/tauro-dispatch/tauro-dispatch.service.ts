import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TauroDispatchService {

  private url = `${environment.SERVICE_URL}`;
  constructor(
    private http: HttpClient
  ) { }

  getDispatchCirculation(params): Observable<any>{
    return this.http.get(`${this.url}tauro/v2/dispatch`,{params})
  }

  getDetailDispatchCirculation(params): Observable<any>{
    return this.http.get(`${this.url}tauro/v2/dispatch/detail`, {params})
  }

}
