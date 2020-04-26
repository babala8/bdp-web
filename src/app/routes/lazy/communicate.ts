import {EventEmitter} from '@angular/core';

export class Communicate {
    changeOrgNo: EventEmitter<number>;
    changeDevNo: EventEmitter<number>;
    private static instance;

    constructor() {
        this.changeOrgNo = new EventEmitter();
        this.changeDevNo = new EventEmitter();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new Communicate();
            return this.instance;
        }
    }
}
