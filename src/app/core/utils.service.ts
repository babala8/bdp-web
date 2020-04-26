import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class EventBus {
    private subject = new BehaviorSubject<any>({});
    get events(): Subject<any> {
        return this.subject;
    }
}
