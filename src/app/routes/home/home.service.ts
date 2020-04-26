import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {SessionService} from '@core/session.service';

@Injectable()
export class HomeService {
    private SERVERAPI = `${environment.SERVICE_URL}`;

    constructor(private http: HttpClient,
                private session: SessionService) {
    }

}
