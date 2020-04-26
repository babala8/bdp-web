import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AddnotesPlanService } from './../../addnotes-plan.service';
import { SYS_CONS } from '../../../../../../models/constant';

@Component({
    selector: 'app-step-form',
    templateUrl: './step-form.component.html'
})
export class StepFormComponent implements AfterViewInit {
    addnotesPlanNo: string;
    MOD = SYS_CONS.ADDNOTE_MODE;
    constructor(public item: AddnotesPlanService) { }

    ngAfterViewInit() {
        console.log('item', this.item);
    }
}
